/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

type Props = {
  panels: {
    header: string;
    content: JSX.Element;
    color?: string;
  }[];
  allowMultiOpenPanels?: boolean;
  defaultOpenPanels?: number[];
};

// when given an array and a number, will return a new ...
// ... array with that number either added or removed
function numRemovalOrAddition(num: number, arr: number[]) {
  const filtered = arr.filter(val => val !== num);
  const arrHasNum = filtered.length !== arr.length;
  return arrHasNum ? filtered : [...arr, num];
}

export default function Accordion({
  panels,
  allowMultiOpenPanels,
  defaultOpenPanels = [],
}: Props) {
  const [openPanels, setOpenPanels] = useState(defaultOpenPanels);

  if (!allowMultiOpenPanels && defaultOpenPanels.length > 1) {
    throw new Error(
      "You can't have more than one open panel, if `allowMultiOpenPanels` isn't `true`, so either set that or reduce the `defaultOpenPanels` length."
    );
  }

  const handlePanelsClick = (id: string) => {
    const idNum = Number(id);
    setOpenPanels(panelState => {
      // either add or remove the clicked id
      const newState = numRemovalOrAddition(idNum, panelState);
      // if we accept many panels to be open return the new array from above
      if (allowMultiOpenPanels) return newState;
      // only ONE panel can be open, so if we opened one panel, ...
      // ... we need to double check and close any opened ones too
      return newState.length > 1 ? [idNum] : newState;
    });
  };

  return (
    <>
      {panels.map(({ header, content, color }, i) => (
        <AccordionItem
          key={header}
          isOpen={openPanels.includes(Number(i))}
          header={header}
          content={content}
          color={color}
          handleClick={handlePanelsClick}
          id={i}
        />
      ))}
    </>
  );
}
