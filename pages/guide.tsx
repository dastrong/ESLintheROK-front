import React from 'react';
import { GetStaticProps } from 'next';
import mdjs from '@moox/markdown-to-json';

import SeoWrapper from 'components/SeoWrapper';
import Accordion from 'components/Accordion';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import { readMarkdownFile } from 'utils/readMarkdownFile';
import { transformJsMdToBlock } from 'utils/transformJsMdToBlock';
import { turnPanelStringToPanelArray } from 'utils/turnPanelStringToPanelArray';

type Props = {
  title: string;
  description: string;
  panelString: string;
};

export default function UserGuidePage({
  title,
  description,
  panelString,
}: Props) {
  const panels = turnPanelStringToPanelArray(panelString);

  return (
    <SeoWrapper
      title="User Guide"
      description="Learn everything you need to know to go from a new to power user with our simple user guide."
    >
      <div>
        <PageHeading>{title}</PageHeading>
        <PageSubHeading>{description}</PageSubHeading>
        <Accordion panels={panels} defaultOpenPanels={[0]} />
      </div>
    </SeoWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fileContent = await readMarkdownFile('USERGUIDE.md');
  const output = mdjs.markdownAsJsTree(fileContent);
  const children = transformJsMdToBlock(output);

  return {
    props: {
      title: output.body.children[0].children[1],
      description: output.body.children[2].children[0],
      panelString: JSON.stringify(children),
    },
  };
};
