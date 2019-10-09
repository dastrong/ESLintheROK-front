import {
  createRef,
  useMemo,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

// numOfRefs = number of refs needed to be passed down
// gameData = could be an array or a string, it depends on the game played
// font = string - needed since fonts all have different sizes
// shouldCalculateSolo = boolean - true: scale individually; false: everything has the same scale
// delayUpdate = boolean - can be used to stop scaling after a certain point, if needed
export default function useFitText(
  numOfRefs,
  gameData,
  font,
  shouldCalculateSolo = false,
  delayUpdate = false
) {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [updateMe, triggerTextUpd] = useState(0);

  // creates an array of ref(s)
  const refs = useMemo(() => {
    return Array(numOfRefs)
      .fill()
      .map(() => createRef());
  }, [numOfRefs]);

  // can be used to trigger a scale adjustment
  const resizeFitText = useCallback(() => triggerTextUpd(x => x + 1), []);

  // trigger a text scale adjustment if the window size changes
  useEffect(() => {
    window.addEventListener("resize", resizeFitText);
    return () => window.removeEventListener("resize", resizeFitText);
  }, [resizeFitText]);

  // the font might not be loaded and/or applied before we calculate the span widths
  // so we'll wait until font's are loaded and give the browser 0.4s to apply them
  // then we'll flip the isFontLoaded variable, so we can calculate the correct scales
  useEffect(() => {
    let id;
    document.fonts.ready.then(() => {
      id = setTimeout(() => setFontLoaded(true), 400);
    });
    return () => clearTimeout(id);
  }, []);

  // calculates and determines the correct scale based on width and height
  useLayoutEffect(() => {
    if (!isFontLoaded) return;
    if (delayUpdate) return;
    calculateFit(refs, shouldCalculateSolo);
  }, [refs, gameData, updateMe, font, isFontLoaded, delayUpdate, shouldCalculateSolo]);

  // return the refs to the parent (game) component
  // and the function to trigger a scale recalculation
  // BTW, each ref needs to be passed down to their own FitText component
  return [refs, resizeFitText];
}

// handles single and multi worded spans and scales accordingly
function calculateFit(refs, shouldCalculateSolo) {
  // the larger the num, the closer the scaling accuracy would be to 100%
  // but that can severely affect performance
  // throttling my performance showed it should be kept under 5 for slower computers
  const numLoops = 3;

  const refsAndStuff = getRefsAndStuff(refs, numLoops);

  // separate refs into arrays based on single and multi worded spans
  const { single, multi } = refsAndStuff.reduce(
    (acc, cVal) => {
      if (cVal.isSingle) {
        acc.single.push(cVal);
      } else {
        acc.multi.push(cVal);
      }
      return acc;
    },
    { single: [], multi: [] }
  );

  // if there's no multi worded spans, we can do a simple scale
  // and avoid expensive layout thrashing
  if (multi.length === 0) {
    // apply each boxes' max scale individually
    if (shouldCalculateSolo) {
      return single.forEach(({ ref, scale }) => applyScale(ref, scale));
    }
    // get the minimum scale for each different parent width
    const scalers = singleScaler(single);
    // apply the correct scale to each ref
    return single.forEach(({ ref, pWidth }) => applyScale(ref, scalers[pWidth]));
  }

  thrashLayout(multi, numLoops);

  // if we're calculating styles individually we'll stop here
  if (shouldCalculateSolo || refsAndStuff.length === 1) {
    return refsAndStuff.forEach(({ ref, isSingle, scale, widthsAndScales }) => {
      if (isSingle) return applyScale(ref, scale);
      // gets the highest scale and it's width
      const maxes = getMaxScaleAndWidth(widthsAndScales);
      // apply that width and scale
      ref.current.style.width = `${maxes.width}px`;
      applyScale(ref, maxes.scale);
    });
  }

  let scalers;

  // no single worded spans, find the min scale of all multi worded spans
  if (single.length === 0) {
    scalers = multiScaler(multi);
  } else {
    const singleScalers = singleScaler(single);
    scalers = multiScaler(multi, singleScalers);
  }

  // determine the correct width that multi spans will receive
  refsAndStuff.forEach(obj => {
    if (!obj.isSingle) {
      const { width } = obj.widthsAndScales.reduce((acc, cVal) => {
        return getDiff(acc, cVal, scalers[obj.pWidth]);
      });
      obj.width = width;
    }
  });

  // apply the scale and width, if needed
  refsAndStuff.forEach(({ ref, pWidth, isSingle, width }) => {
    if (!isSingle) {
      ref.current.style.width = `${width}px`;
    }
    applyScale(ref, scalers[pWidth]);
  });
}

// get the highest scale and width combo
function getMaxScaleAndWidth(widthsAndScales) {
  return widthsAndScales.reduce((acc, cVal) => (acc.scale < cVal.scale ? cVal : acc));
}

// destructures a ref
function deRef(ref) {
  const pHeight = ref.current.parentNode.offsetHeight;
  const sWidth = ref.current.offsetWidth;
  const sHeight = ref.current.offsetHeight;
  const text = ref.current.textContent;
  return { sWidth, sHeight, pHeight, text };
}

// returns an array of objects containing everything needed
// to manipulate, calculate and determine an optimal width/scale combo
function getRefsAndStuff(refs, numLoops) {
  // get adjusted all parent widths
  const pWidths = getParentWidths(refs);

  // write - set min content
  refs.forEach(ref => (ref.current.style.width = "min-content"));

  // read - capture the min width
  let refsAndStuff = refs.map((ref, i) => {
    const pWidth = pWidths[i];
    const { pHeight, sWidth, sHeight, text } = deRef(ref);
    // if the parent or span's width or height is 0, skip calculating anything
    if (!pHeight || !pWidth || !sWidth || !sHeight) {
      return { ref, pWidth: 0, isSingle: true, scale: 0 };
    }
    // check if there's one a single word in the text
    const isSingle = text.split(" ").length === 1;
    const minWidth = sWidth;
    if (isSingle) {
      // if it's just a single word, determine the max scale now
      const scale = getScale(pWidth, pHeight, minWidth, sHeight);
      return { ref, pWidth, isSingle, scale };
    } else {
      // grab the scale for the min width now to avoid doing it twice later
      const scale = getScale(pWidth, pHeight, minWidth, sHeight);
      let widthsAndScales = [{ width: minWidth, scale }];
      return { ref, pWidth, isSingle, widthsAndScales };
    }
  });

  // write - set max content
  refs.forEach(ref => (ref.current.style.width = "max-content"));

  // read - capture the max width
  // and determine the optimal widths to thrash
  refsAndStuff.forEach(({ ref, isSingle, widthsAndScales }, i) => {
    if (!isSingle) {
      const pWidth = pWidths[i];
      const { pHeight, sWidth, sHeight } = deRef(ref);
      // grab the min width that we calculate during our last read
      const minWidth = widthsAndScales[0].width;
      const spanWidth = sWidth + 1;
      // the span shouldn't be larger than the actual parent === lots of wasted calculations
      const maxWidth = pWidth < spanWidth ? pWidth : spanWidth;
      const incrementVal = (maxWidth - minWidth) / (numLoops + 1);
      // since we already have the minWidth/scale, we can skip it later
      const start = minWidth + incrementVal;
      const end = start + numLoops * incrementVal;
      // add all the middle widths that we'll get scales to later
      for (let i = start; i < end; i += incrementVal) {
        widthsAndScales.push({ width: i, scale: null });
      }
      // add the max width scale
      const scale = getScale(pWidth, pHeight, sWidth, sHeight);
      widthsAndScales.push({ width: maxWidth, scale });
    }
  });

  return refsAndStuff;
}

// used to avoid the acc offsetWidth
function getParentWidths(refs) {
  // combine all parent widths into one array
  let parentWidths = refs.map(ref => ref.current.parentNode.offsetWidth);
  // get all the unique widths
  const uniqueWidths = Array.from(new Set(parentWidths));
  // check if there are multiple unique widths
  if (uniqueWidths.length === 2) {
    // if two widths are closely related set every parentWidths to the larger one
    // otherwise we'll just use those original widths
    if (Math.abs(uniqueWidths[0] - uniqueWidths[1]) < 5) {
      const max = Math.max(uniqueWidths[0], uniqueWidths[1]);
      parentWidths = parentWidths.map(() => max);
    }
  } else if (uniqueWidths.length > 2) {
    // filter our unique widths further if they are closely related
    const uniquelyClumped = uniqueWidths.reduce((acc, cVal) => {
      if (!acc.length) return [cVal];
      if (acc.some(width => Math.abs(width - cVal) < 5)) return acc;
      return [...acc, cVal];
    }, []);
    // set every width with it's closest unique width
    parentWidths = parentWidths.map(pWidth => {
      return uniquelyClumped.find(uQ => Math.abs(uQ - pWidth) < 5) || 0;
    });
  }
  return parentWidths;
}

// used to determine optimal width/scale for single worded spans
// creates an object
// keys = Number - unique parent widths
// properties = Number - minimum scale
function singleScaler(single) {
  return single.reduce((acc, { pWidth, scale }) => {
    if (acc[pWidth]) {
      acc[pWidth] = Math.min(acc[pWidth], scale);
    } else {
      acc[pWidth] = scale;
    }
    return acc;
  }, {});
}

// used to determine optimal width/scale for multi worded spans
// creates an object or builds on an object of single worded width/scale combos
// keys = Number - unique parent widths
// properties = Number - minimum scale
function multiScaler(multi, initialVal = {}) {
  return multi.reduce((acc, { pWidth, widthsAndScales }) => {
    // gather all the scale values
    const scales = widthsAndScales.map(({ scale }) => scale);
    // check to see if the pWidth has already been added
    const scale = acc[pWidth]
      ? // get the MIN scale between different spans with the same pWidth
        Math.min(Math.max(...scales), acc[pWidth])
      : // get the MAX scale of this pWidth for now
        Math.max(...scales);
    // apply that scale
    acc[pWidth] = scale;
    return acc;
  }, initialVal);
}

// compares the parent container's width/height with the inner span's initial width/height
// to determine how much we can make the span larger before it exceeds the parent container
function getScale(pWidth, pHeight, width, height, buffer = 20) {
  const heightScale = (pHeight - buffer / 2) / height;
  const widthScale = (pWidth - buffer) / width;
  return Math.min(heightScale, widthScale);
}

// read and write width styles to create width/scale combos
// which are then attached to the widthsAndScales array
function thrashLayout(multi, numLoops) {
  // start at 1 and stop at the numLoops value because
  // we already have the minWidth/scale combos - calculated in getRefsAndStuff
  for (let i = 1; i <= numLoops; i++) {
    // write - add those widths
    multi.forEach(({ ref, widthsAndScales }) => {
      ref.current.style.width = `${widthsAndScales[i].width}px`;
    });
    // read - get the scale values for those width changes
    multi.forEach(({ ref, widthsAndScales, pWidth }) => {
      const { pHeight, sWidth, sHeight } = deRef(ref);
      const scale = getScale(pWidth, pHeight, sWidth, sHeight);
      widthsAndScales[i].scale = scale;
    });
  }
}

// used to compare multi word spans scales with the scaler
// returns the longest width whose scale value is over/equal to the scaler param
function getDiff(a, b, scaler) {
  if (a.scale < scaler) return b;
  if (b.scale < scaler) return a;
  return a.width > b.width ? a : b;
}

// applies the scale and sets opacity to 1 for initial loading
function applyScale(ref, scale) {
  ref.current.style.opacity = 1;
  ref.current.style.transform = `scale(${scale})`;
}
