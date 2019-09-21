import React from "react";
import classnames from "classnames";
import Card from "@Reusable/Card";
import "./CardRow.css";

export default function CardRow(props) {
  const {
    rowIdx,
    rowArr,
    targets,
    colors,
    clickedID,
    clickedIDs,
    handleClick,
    getBackCard,
  } = props;

  // get the two cards ids
  const rowIDs = [rowIdx, rowIdx + 1];
  // check if either cards were clicked
  const isClicked = rowIDs.map(id => clickedIDs.includes(id));
  // check if both are clicked
  const isEmpty = isClicked.every(isClicked => isClicked);
  // add a className if both cards were clicked to animate the row out
  const cx = classnames("card-row", { flex0: isEmpty });

  return (
    <div className={cx}>
      {rowArr.map(({ text, ref }, i) => {
        const id = rowIDs[i];
        const isTarget = targets.includes(id);
        const [textBack, colorBack] = getBackCard(isTarget);
        return (
          <Card
            id={id}
            key={"card" + id}
            ref={ref}
            textFront={text}
            textBack={textBack}
            colorFront={colors[id]}
            colorBack={colorBack}
            handleClick={handleClick}
            flipMe={clickedID === id || isClicked[i]}
            slideMe={!isEmpty && isClicked[i]}
          />
        );
      })}
    </div>
  );
}
