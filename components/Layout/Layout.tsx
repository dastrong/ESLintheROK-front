import React from 'react';
import { useRouter } from 'next/router';
import LayoutNav from './LayoutNav';
import LayoutContent from './LayoutContent';

// children will be whatever page you're rendering
export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  const visibleNav = ['/games', '/contact', '/about'].includes(pathname);

  return (
    <>
      <LayoutNav visibleNav={visibleNav} />

      <section>
        <LayoutContent visibleNav={visibleNav}>{children}</LayoutContent>

        <style jsx>{`
          section {
            position: relative;
            margin-top: ${visibleNav ? 86 : 0}px;
            height: calc(100vh - ${visibleNav ? '86px' : 0});
            width: 100vw;
            top: 0;
            left: 0;
            overflow: hidden;
          }
        `}</style>
      </section>
    </>
  );
}
