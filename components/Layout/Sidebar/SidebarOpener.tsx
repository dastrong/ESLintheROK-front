import React from 'react';
import { FaList } from 'react-icons/fa';
import { css } from 'styled-jsx/css';
import { useStore } from 'contexts/store';
import Button from 'components/Button';

const SidebarOpenerCSS = css.resolve`
  button {
    position: fixed;
    z-index: 100;
    transition: all 0.5s;
    top: 7px;
    right: 7px;
  }
`;

export default function SidebarOpener() {
  const { storeDispatch } = useStore();

  return (
    <>
      <Button
        rounded
        className={SidebarOpenerCSS.className}
        size="xl"
        Icon={FaList}
        color="#fff"
        bgColor="#FDB813"
        onClick={() => storeDispatch({ type: 'Open_Sidebar' })}
      />

      {SidebarOpenerCSS.styles}
    </>
  );
}
