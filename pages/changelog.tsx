import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import mdjs from '@moox/markdown-to-json';

import SeoWrapper from 'components/SeoWrapper';
import Accordion from 'components/Accordion';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import { readMarkdownFile } from 'utils/readMarkdownFile';
import { transformJsMdToBlock } from 'utils/transformJsMdToBlock';
import { turnPanelStringToPanelArray } from 'utils/turnPanelStringToPanelArray';
import { useStore } from 'contexts/store';
import Cookies from 'js-cookie';

type Props = {
  title: string;
  description: string;
  panelString: string;
};

export default function ChangelogPage({
  title,
  description,
  panelString,
}: Props) {
  const { storeDispatch } = useStore();
  const panels = turnPanelStringToPanelArray(panelString);

  useEffect(() => {
    Cookies.set('last_viewed_update', new Date().toISOString(), {
      expires: 365,
      secure: !!(process.env.NODE_ENV === 'production'),
      sameSite: 'strict',
    });
    storeDispatch({ type: 'Set_Changelog_Notification', show: false });
  }, [storeDispatch]);

  return (
    <SeoWrapper
      title="Changelog"
      description="Stay caught up with every update being made to the site here."
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
  const changelogContent = await readMarkdownFile('CHANGELOG.md');
  const output = mdjs.markdownAsJsTree(changelogContent);
  const children = transformJsMdToBlock(output);

  return {
    props: {
      title: output.body.children[0].children[1],
      description: output.body.children[2].children[0],
      panelString: JSON.stringify(children),
    },
  };
};
