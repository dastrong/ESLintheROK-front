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
    left: 7px;
  }

  button:hover {
    background-color: rgba(180, 175, 175, 0.4);
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
        color="rgb(0, 0, 0)"
        bgColor="hsla(0, 0%, 100%, 0)"
        onClick={() => storeDispatch({ type: 'openSidebar' })}
      />

      {SidebarOpenerCSS.styles}
    </>
  );
}
