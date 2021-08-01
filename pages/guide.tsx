import React from 'react';
import { GetStaticProps } from 'next';
import mdjs from '@moox/markdown-to-json';
import Accordion from 'components/Accordion';
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
    <div>
      <h1 className="heading">{title}</h1>

      <div className="sub-heading">
        <p>{description}</p>
      </div>

      <Accordion panels={panels} defaultOpenPanels={[0]} />

      <style jsx>{`
        .heading {
          margin: 2rem auto 1.25rem;
          text-align: center;
          color: #414141;
          font-size: 3.5rem;
          font-weight: normal;
        }

        .sub-heading {
          color: #5a5c62;
          font-size: 1.3rem;
          line-height: 150%;
          margin: 0 auto;
          max-width: 600px;
          text-align: center;
        }
      `}</style>
    </div>
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
