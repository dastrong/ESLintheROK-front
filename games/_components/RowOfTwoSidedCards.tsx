import React from 'react';
import TwoSidedCard from 'games/_components/TwoSidedCard';

export default function CardRow({
  rowIdx,
  rowArr,
  targets,
  colors,
  clickedID,
  clickedIDs,
  flipX,
  flipY,
  fitTextClass,
  cardClass,
  handleClick,
  getBackCard,
}: {
  rowIdx: number;
  rowArr: {
    text: string;
    ref: React.RefObject<HTMLSpanElement>;
  }[];
  targets: number[];
  colors: string[];
  clickedID: number;
  clickedIDs: number[];
  flipX?: boolean;
  flipY?: boolean;
  fitTextClass?: string;
  cardClass?: string;
  handleClick: (e: any) => void;
  getBackCard: (isX: boolean) => string[];
}) {
  // get the two cards ids
  const rowIDs = [rowIdx, rowIdx + 1];
  // check if either cards were clicked
  const isClicked = rowIDs.map(id => clickedIDs.includes(id));
  // check if both are clicked
  const isEmpty = isClicked.every(isClicked => isClicked);

  return (
    <div className="two-sided-card-row">
      {rowArr.map(({ text, ref }, i) => {
        const id = rowIDs[i];
        const isTarget = targets.includes(id);
        const [textBack, colorBack] = getBackCard(isTarget);
        const flipCard = clickedID === id || isClicked[i];
        return (
          <TwoSidedCard
            id={id}
            key={'card' + id}
            ref={ref}
            textFront={text}
            textBack={textBack}
            colorFront={colors[id]}
            colorBack={colorBack}
            handleClick={handleClick}
            width="50%"
            flipX={flipX && flipCard}
            flipY={flipY && flipCard}
            slideOut={!isEmpty && isClicked[i]}
            cardClass={cardClass}
            fitTextClass={fitTextClass}
          />
        );
      })}

      <style jsx>{`
        .two-sided-card-row {
          width: 100vw;
          display: flex;
          flex: ${isEmpty ? 0 : 1};
          transition: ${isEmpty ? '0.5s flex' : 'none'};
        }
      `}</style>
    </div>
  );
}
