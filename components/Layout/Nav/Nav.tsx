import React from 'react';
import NavWave from './NavWave';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import usePlayCheck from '../usePlayCheck';

export default function Nav() {
  const isGamePlaying = usePlayCheck();

  return (
    <nav>
      <NavWave />

      <div>
        <NavLogo />
        <NavLinks />
      </div>

      <style jsx>{`
        nav {
          position: relative;
          display: ${isGamePlaying ? 'none' : 'flex'};
          width: 100%;
          margin: 0px;
          z-index: 11;
        }

        div {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
        }
      `}</style>
    </nav>
  );
}
