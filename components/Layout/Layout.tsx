import React from 'react';
import LayoutNav from './LayoutNav';
import LayoutContent from './LayoutContent';

// children will be whatever page you're rendering
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutNav />

      <section>
        <LayoutContent>{children}</LayoutContent>

        <style jsx>{`
          section {
            position: relative;
            height: 100vh;
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
