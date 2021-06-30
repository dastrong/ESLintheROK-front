import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'contexts/store';
import { useOnClickOutside } from 'hooks';

import SidebarGameList from './SidebarGameList';
import SidebarActions from './SidebarActions';
import SidebarOpener from './SidebarOpener';

export default function Sidebar() {
  const { asPath } = useRouter();
  const { isSidebarOpen, storeDispatch } = useStore();

  // ref to handle closing the sidebar when user clicks away from it
  const ref = useRef();
  useOnClickOutside(ref, () => storeDispatch({ type: 'Close_Sidebar' }));

  // close the menu on route change
  useEffect(() => {
    storeDispatch({ type: 'Close_Sidebar' });
  }, [asPath]);

  return (
    <>
      <SidebarOpener />
      {/* the actual menu */}

      <aside>
        <div ref={ref}>
          <SidebarActions />
          <SidebarGameList />
        </div>

        <style jsx>{`
          aside {
            transform: translate3d(${isSidebarOpen ? '0%' : '100vh'}, 0, 0);
            transform-origin: right;
            transition: transform 0.5s ease;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 111111;
            height: 100vh;
            width: 350px;
            background-color: rgb(27, 28, 29);
          }

          div {
            height: 100%;
            overflow-y: auto;
          }
        `}</style>
      </aside>
    </>
  );
}
