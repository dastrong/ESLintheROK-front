import { createRef, useMemo, useEffect, useState } from "react";

// gameData - could be an array or a string - depends on the game played
// isWidthStatic - boolean to know if the parent container widths won't be equal
export default function useFitText(gameData, font, isWidthStatic) {
  const [count, setCount] = useState(0);
  const [isFontLoaded, setFontLoaded] = useState(false);

  // create a single or an array of refs
  // depends on if gameData is a string or an array of strings
  const refs = useMemo(() => {
    if (typeof gameData === "string") {
      return createRef();
    } else {
      return gameData.map(() => createRef());
    }
  }, [gameData]);

  // trigger a text scale adjustment if the window size changes
  useEffect(() => {
    const updateState = () => setCount(old => old + 1);
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [setCount]);

  // the font might not be loaded and/or applied before we calculate the span widths
  // so we'll wait until font's are loaded and give the browser 0.4s to apply them
  // then we'll flip the isFontLoaded variable, so we can calculate the correct scales
  useEffect(() => {
    let id;
    document.fonts.ready.then(e => {
      if (e.status === "loaded") {
        id = setTimeout(() => setFontLoaded(true), 400);
      }
    });
    return () => clearTimeout(id);
  }, []);

  // calculates and determines the correct scale based on width and height
  useEffect(() => {
    if (!isFontLoaded) return;
    if (typeof gameData === "string") {
      // only dealing with ONE ref
      const scaler = getScaler(refs);
      refs.current.style.opacity = 1;
      refs.current.style.transform = `scale(${scaler})`;
    } else {
      // dealing with an ARRAY of refs
      if (isWidthStatic) {
        // we use offsetWidth/offsetHeight for parent container and the span
        // because it's not necessary to have precise measurement here
        const scales = refs.map(ref => getScaler(ref));
        const scaler = Math.min(...scales);
        refs.forEach(ref => {
          ref.current.style.opacity = 1;
          ref.current.style.transform = `scale(${scaler})`;
        });
      } else {
        const scales = getDynamicScales(refs);
        // apply each scale to their respective ref
        refs.forEach((ref, i) => (ref.current.style.opacity = 1));
        refs.forEach((ref, i) => (ref.current.style.transform = `scale(${scales[i]})`));
      }
    }
  }, [refs, gameData, isWidthStatic, count, font, isFontLoaded]);

  // return the ref(s) to the parent (game) component
  // each ref will be passed down to their own FitText component
  return refs;
}

// using getBoundingClientRect for parent container ONLY
// because I need to exact widths to calculate scale correctly
function getDynamicScales(refs) {
  // create an array with the parent width and the correct scale
  const widthsAndScales = refs.map(({ current }) => {
    const { width } = current.parentNode.getBoundingClientRect();
    return { width: Math.floor(width), scale: getScaler(current) };
  });
  // create an array with the lowest scale for every unique width
  const filteredWidths = widthsAndScales.reduce((acc, cVal) => {
    if (!acc.length) return [cVal];
    // check if the width has already been added
    const index = acc.findIndex(obj => obj.width === cVal.width);
    // not found - add it
    if (index < 0) return [...acc, cVal];
    // found obj - return the larger span's scale val
    const scale = Math.min(acc[index].scale, cVal.scale);
    acc[index].scale = scale;
    return acc;
  }, []);
  // create an array of scales depending on the parent's width
  const scales = widthsAndScales.map(parent => {
    const index = filteredWidths.findIndex(({ width }) => width === parent.width);
    return filteredWidths[index].scale;
  });
  return scales;
}

// compares the parent container's width/height with the inner span's initial width/height
// to determine how much we can make the span larger before it exceeds the parent container
function getScaler(ref, buffer = 15) {
  const { parentNode, offsetHeight, offsetWidth } = ref.current;
  const heightScale = (parentNode.offsetHeight - buffer / 2) / offsetHeight;
  const widthScale = (parentNode.offsetWidth - buffer) / offsetWidth;
  return Math.min(heightScale, widthScale);
}
