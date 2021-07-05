import React from 'react';
import FooterSvgs from './FooterSvgs';
import FooterCornerTexts from './FooterCornerTexts';
import FooterLinks from './FooterLinks';

export default function Footer({ maxSVGWidth }: { maxSVGWidth: number }) {
  return (
    <footer>
      <FooterSvgs maxWidth={maxSVGWidth} />
      <FooterCornerTexts />
      <FooterLinks />

      <style jsx>{`
        footer {
          position: relative;
          height: 250px;
          width: 100%;
          background-color: var(--siteBgColor);
          display: flex;
          justify-content: center;
          color: #565656;
        }
      `}</style>
    </footer>
  );
}
