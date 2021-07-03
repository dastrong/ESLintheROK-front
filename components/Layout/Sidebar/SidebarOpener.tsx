import React from 'react';
import { FaList } from 'react-icons/fa';
import { css } from 'styled-jsx/css';
import { useStore } from 'contexts/store';
import Button from 'components/Button';

const SidebarOpenerCSS = css.resolve`
  .sidebar_button {
    position: fixed;
    z-index: 100;
    top: calc((var(--navHeight) - var(--btnHeight)) / 2);
    right: 2vw;
    height: var(--btnHeight);
    width: var(--btnHeight);
    padding: 0;
    font-size: 1.85vw;
    line-height: 1.85vw;

    --btnHeight: calc(var(--navHeight) * 0.85 * 0.94);
  }
`;

export default function SidebarOpener() {
  const { storeDispatch } = useStore();

  return (
    <>
      <Button
        rounded
        className={['sidebar_button', SidebarOpenerCSS.className]}
        size="xl"
        Icon={FaList}
        color="#fff"
        bgColor="#fdb813bd"
        onClick={() => storeDispatch({ type: 'Open_Sidebar' })}
      />

      {SidebarOpenerCSS.styles}
    </>
  );
}
