import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'contexts/store';

import SidebarGameList from './SidebarGameList';
import SidebarActions from './SidebarActions';
import SidebarOpener from './SidebarOpener';

export default function Sidebar() {
  const { asPath } = useRouter();
  const { isSidebarOpen, storeDispatch } = useStore();

  // close the menu on route change
  useEffect(() => {
    storeDispatch({ type: 'closeSidebar' });
  }, [asPath]);

  return (
    <>
      <SidebarOpener />
      {/* the actual menu */}
      <div>
        <SidebarActions />
        <SidebarGameList />

        <style jsx>{`
          div {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 111111;
            height: 100vh;
            width: 350px;
            background-color: rgb(27, 28, 29);
            overflow-y: auto;

            transform: translate3d(${isSidebarOpen ? '0%' : '-100%'}, 0, 0);
            transition: transform 0.5s ease;
          }
        `}</style>
      </div>
    </>
  );
}
