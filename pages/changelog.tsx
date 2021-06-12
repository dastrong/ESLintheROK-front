import React from 'react';
import { GetStaticProps } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import mdjs from '@moox/markdown-to-json';
import Accordion from 'components/Accordion';

type Props = {
  title: string;
  description: string;
  panels: any;
};

export default function ChangelogPage({ title, description, panels }: Props) {
  // recursively creates children elements
  function renderChild(elObj: { tag: string; props: any[]; children: any[] }) {
    return React.createElement(
      elObj.tag,
      {
        key: Math.random() * 1111,
        style: ['ul', 'ol'].includes(elObj.tag)
          ? { paddingLeft: '30px' }
          : elObj.tag === 'p'
          ? { margin: 'auto' }
          : {},
        ...elObj.props,
      },
      elObj.children.map(nestedChild =>
        typeof nestedChild === 'string' ? nestedChild : renderChild(nestedChild)
      )
    );
  }

  const finalPanels = JSON.parse(panels).reduce((acc: any[], cVal: any) => {
    // the start of a new changelog entry
    if (cVal.tag === 'h2') {
      // we don't want the id to link it so we can just grab the second item; the text
      const header = cVal.children[1];
      // start a new changelog entry with the header from above
      acc.push({ header, content: [] });
    } else {
      // the content of an entry
      const lastItemIndex = acc.length - 1;
      // create an element based on the children given
      acc[lastItemIndex].content.push(renderChild(cVal));
    }
    return acc;
  }, []);

  return (
    <div>
      <h1 className="heading">{title}</h1>

      <div className="sub-heading">
        <p>{description}</p>
      </div>

      <Accordion panels={finalPanels} />

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
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  const changelogFile = await fs.readFile(changelogPath, { encoding: 'utf-8' });
  const output = mdjs.markdownAsJsTree(changelogFile);

  const panels = JSON.stringify(
    output.body.children
      .slice(3)
      .filter((markChild: any) => markChild !== '\n')
      .map((markChild: any) => {
        const newChildren = markChild.children.filter(
          (markChildChild: any) => markChildChild !== '\n'
        );

        return { ...markChild, children: newChildren };
      })
  );

  return {
    props: {
      title: output.body.children[0].children[1],
      description: output.body.children[2].children[0],
      panels,
    },
  };
};
