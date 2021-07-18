import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { animated, config, useSprings } from 'react-spring';
import classNames from 'classnames';
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
import Popup from 'components/Popup';
import * as Styles from './Menu.styles';

const numOfButtons = 7;
const buttons = Array(numOfButtons).fill('');

export default function Menu() {
  const { asPath } = useRouter();
  const { isMenuOpen, storeDispatch } = useStore();

  // ref to handle closing the menu when user clicks away from it
  const ref = useRef();
  useOnClickOutside(ref, () => {
    if (isMenuOpen) storeDispatch({ type: 'Close_Menu' });
  });

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

  // className that's reused for event item
  const menuItemCX = classNames('menu_item', Styles.MenuItemCSS.className);

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

      <Popup
        placement="left"
        content="Go Home"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[0]} className={menuItemCX}>
            <Link href="/" passHref>
              <Button
                as="a"
                rounded
                size="lg"
                Icon={RiHome2Fill}
                color="white"
                bgColor="green"
              />
            </Link>
          </animated.div>
        }
      />

      <Popup
        placement="left"
        content="View Games"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[1]} className={menuItemCX}>
            <Link href="/games" passHref>
              <Button
                as="a"
                rounded
                size="lg"
                Icon={RiGamepadFill}
                color="white"
                bgColor="green"
              />
            </Link>
          </animated.div>
        }
      />

      <Popup
        placement="left"
        content="View Settings"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[2]} className={menuItemCX}>
            <Button
              rounded
              size="lg"
              Icon={RiSettings4Fill}
              color="white"
              bgColor="green"
              onClick={console.log}
            />
          </animated.div>
        }
      />

      <Popup
        placement="left"
        content="Handpick Lessons"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[3]} className={menuItemCX}>
            <Button
              rounded
              size="lg"
              Icon={RiFileSearchFill}
              color="white"
              bgColor="green"
              onClick={() => {
                storeDispatch({
                  type: 'Open_Data_Modal',
                  dataModalName: 'lessons',
                });
              }}
            />
          </animated.div>
        }
      />

      <Popup
        placement="left"
        content="Edit Current Data"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[4]} className={menuItemCX}>
            <Button
              rounded
              size="lg"
              Icon={RiFileSettingsFill}
              color="white"
              bgColor="green"
              onClick={() => {
                storeDispatch({
                  type: 'Open_Data_Modal',
                  dataModalName: 'edit',
                });
              }}
            />
          </animated.div>
        }
      />

      <Popup
        placement="left"
        content="Create Custom Lesson"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[5]} className={menuItemCX}>
            <Button
              rounded
              size="lg"
              Icon={RiFileTransferFill}
              color="white"
              bgColor="green"
              onClick={() => {
                storeDispatch({
                  type: 'Open_Data_Modal',
                  dataModalName: 'custom',
                });
              }}
            />
          </animated.div>
        }
      />

      <Popup
        placement="left"
        content="View Past Lessons"
        tooltipContainerCx={Styles.MenuItemPopupCSS.className}
        owner={
          <animated.div style={springs[6]} className={menuItemCX}>
            <Button
              rounded
              size="lg"
              Icon={RiFileShield2Fill}
              color="white"
              bgColor="green"
              onClick={() => {
                storeDispatch({
                  type: 'Open_Data_Modal',
                  dataModalName: 'past',
                });
              }}
            />
          </animated.div>
        }
      />

      {Styles.MenuContainerCSS.styles}
      {Styles.MenuTogglerCSS.styles}
      {Styles.MenuItemCSS.styles}
      {Styles.MenuItemPopupCSS.styles}
    </div>
  );
}
