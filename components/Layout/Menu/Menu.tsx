import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { animated, config, useSprings } from 'react-spring';
import {
  RiMenuFill,
  RiCloseFill,
  RiHome2Fill,
  RiGamepadFill,
  RiSettings4Fill,
  RiFileSearchFill,
  RiFileSettingsFill,
  RiFileTransferFill,
  RiFileShield2Fill,
} from 'react-icons/ri';

import { useStore } from 'contexts/store';
import { useOnClickOutside } from 'hooks';
import Button from 'components/Button';
import * as Styles from './Menu.styles';

const AnimatedButton = animated(Button);
const numOfButtons = 7;
const buttons = Array(numOfButtons).fill('');

export default function Menu() {
  const { asPath } = useRouter();
  const { isMenuOpen, storeDispatch } = useStore();

  // ref to handle closing the menu when user clicks away from it
  const ref = useRef();
  useOnClickOutside(ref, () => storeDispatch({ type: 'Close_Menu' }));

  // menu option springs
  const springs = useSprings(
    numOfButtons,
    buttons.map((_, i) => ({
      opacity: isMenuOpen ? 1 : 0,
      y: isMenuOpen ? (i + 1) * 65 : 0,
      delay: isMenuOpen ? i * 50 : (numOfButtons - i + 1) * 15,
      config: config.gentle,
    }))
  );

  // close the menu on route change
  useEffect(() => {
    storeDispatch({ type: 'Close_Menu' });
  }, [asPath]);

  return (
    <div ref={ref} className={Styles.MenuContainerCSS.className}>
      <Button
        rounded
        size="lg"
        Icon={isMenuOpen ? RiCloseFill : RiMenuFill}
        color="white"
        bgColor="#fdb813"
        className={['menu_toggler', Styles.MenuTogglerCSS.className]}
        onClick={() =>
          storeDispatch({
            type: isMenuOpen ? 'Close_Menu' : 'Open_Menu',
          })
        }
      />

      <Link href="/" passHref>
        <AnimatedButton
          as="a"
          style={springs[0]}
          rounded
          size="lg"
          Icon={RiHome2Fill}
          color="white"
          bgColor="green"
          onClick={console.log}
          className={['menu_item', Styles.MenuItemCSS.className]}
        />
      </Link>
      <Link href="/games" passHref>
        <AnimatedButton
          as="a"
          style={springs[1]}
          rounded
          size="lg"
          Icon={RiGamepadFill}
          color="white"
          bgColor="green"
          className={['menu_item', Styles.MenuItemCSS.className]}
          onClick={console.log}
        />
      </Link>
      <AnimatedButton
        style={springs[2]}
        rounded
        size="lg"
        Icon={RiSettings4Fill}
        color="white"
        bgColor="green"
        onClick={console.log}
        className={['menu_item', Styles.MenuItemCSS.className]}
      />
      <AnimatedButton
        style={springs[3]}
        rounded
        size="lg"
        Icon={RiFileSearchFill}
        color="white"
        bgColor="green"
        onClick={() => {
          storeDispatch({ type: 'Open_Data_Modal', dataModalName: 'lessons' });
        }}
        className={['menu_item', Styles.MenuItemCSS.className]}
      />
      <AnimatedButton
        style={springs[4]}
        rounded
        size="lg"
        Icon={RiFileSettingsFill}
        color="white"
        bgColor="green"
        onClick={() => {
          storeDispatch({ type: 'Open_Data_Modal', dataModalName: 'edit' });
        }}
        className={['menu_item', Styles.MenuItemCSS.className]}
      />
      <AnimatedButton
        style={springs[5]}
        rounded
        size="lg"
        Icon={RiFileTransferFill}
        color="white"
        bgColor="green"
        onClick={() => {
          storeDispatch({ type: 'Open_Data_Modal', dataModalName: 'custom' });
        }}
        className={['menu_item', Styles.MenuItemCSS.className]}
      />
      <AnimatedButton
        style={springs[6]}
        rounded
        size="lg"
        Icon={RiFileShield2Fill}
        color="white"
        bgColor="green"
        onClick={() => {
          storeDispatch({ type: 'Open_Data_Modal', dataModalName: 'past' });
        }}
        className={['menu_item', Styles.MenuItemCSS.className]}
      />

      {Styles.MenuContainerCSS.styles}
      {Styles.MenuTogglerCSS.styles}
      {Styles.MenuItemCSS.styles}
    </div>
  );
}
