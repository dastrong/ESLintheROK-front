import React from 'react';
import type { FilteredChildren } from 'utils/transformJsMdToBlock';

// recursively creates children elements
const recursivelyRenderChild = (elObj: FilteredChildren): React.ReactNode => {
  // returns an element as well as any children it may have
  return React.createElement(
    elObj.tag,
    {
      key: JSON.stringify(elObj.children),
      style: ['ul', 'ol'].includes(elObj.tag)
        ? { paddingLeft: '30px', margin: '0' }
        : elObj.tag === 'p'
        ? { margin: '1rem auto' }
        : {},
      ...elObj.props,
    },
    elObj.children.map(nestedChild =>
      typeof nestedChild === 'string'
        ? nestedChild
        : recursivelyRenderChild(nestedChild)
    )
  );
};

export const turnPanelStringToPanelArray = (panelString: string) => {
  return JSON.parse(panelString).map((panel: any) => ({
    ...panel,
    content: panel.content.map((elObj: any) => recursivelyRenderChild(elObj)),
  }));
};
