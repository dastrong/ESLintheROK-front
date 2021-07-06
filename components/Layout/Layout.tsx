import React from 'react';
import Menu from './Menu';
import Nav from './Nav';
import Content from './Content';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

// used to scale the svg backgrounds and place the ScrollToTop button correctly
const maxWidthOfFooterSvg = 1200;

// children will be whatever page you're rendering
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <Nav />
      <Content>{children}</Content>
      <ScrollToTop maxWidth={maxWidthOfFooterSvg} />
      <Footer maxSVGWidth={maxWidthOfFooterSvg} />
    </>
  );
}
