import React from 'react';
import NavWave from './NavWave';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
// import useNavPageCheck from './useNavPageCheck';

export default function Nav() {
  // const isNavVisible = useNavPageCheck();
  const isNavVisible = true;

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
          display: flex;
          width: 100%;
          margin: 0px;
          z-index: 11;
          transition: transform 125ms ${isNavVisible ? '0s' : '250ms'};
          transform: translateY(${isNavVisible ? 0 : '-105'}%);
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
