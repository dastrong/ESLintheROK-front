import React from 'react';
import SeoWrapper from 'components/SeoWrapper';
import FontLoader from 'components/FontLoader';

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export default function GameWrapper({ children, title, description }: Props) {
  return (
    <SeoWrapper title={title} description={description}>
      <FontLoader />

      {children}
    </SeoWrapper>
  );
}
