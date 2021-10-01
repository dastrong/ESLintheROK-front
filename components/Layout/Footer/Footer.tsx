import React from 'react';
import FooterSvgs from './FooterSvgs';
import FooterCornerTexts from './FooterCornerTexts';
import FooterLinks from './FooterLinks';
import usePlayCheck from '../usePlayCheck';

export default function Footer({ maxSVGWidth }: { maxSVGWidth: number }) {
  const isGamePlaying = usePlayCheck();

  return (
    <footer>
      <FooterSvgs maxWidth={maxSVGWidth} />
      <FooterCornerTexts />
      <FooterLinks />

      <style jsx>{`
        footer {
          position: relative;
          height: var(--footerHeight);
          width: 100%;
          background-color: var(--siteBgColor);
          display: ${isGamePlaying ? 'none' : 'flex'};
          justify-content: center;
          color: #565656;
        }
      `}</style>
    </footer>
  );
}
