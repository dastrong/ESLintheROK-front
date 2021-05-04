import React from 'react';
import { FaList } from 'react-icons/fa';
import { useStore } from 'contexts/store';

export default function SidebarOpener() {
  const { storeDispatch } = useStore();

  return (
    <button onClick={() => storeDispatch({ type: 'openSidebar' })}>
      <FaList style={{ verticalAlign: 'top' }} />

      <style jsx>{`
        button {
          position: fixed;
          z-index: 100;
          background-color: hsla(0, 0%, 100%, 0);
          transition: all 0.5s;
          top: 8px;
          left: 8px;
          margin: 0;
          padding: 0;
          height: 70px;
          width: 70px;
          border-radius: 50%;
          font-size: 1.5rem;
          line-height: 1.5rem;
        }

        button:hover {
          background-color: rgba(180, 175, 175, 0.4);
        }
      `}</style>
    </button>
  );
}
