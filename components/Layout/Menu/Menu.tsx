import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { animated, config, useSprings } from 'react-spring';
import classNames from 'classnames';
import { getScale, darken } from 'color2k';
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
import usePlayCheck from '../usePlayCheck';

import dynamic from 'next/dynamic';
const Popup = dynamic(() => import('components/Popup'));

const numOfButtons = 7;
const buttons = Array(numOfButtons).fill('');

// creates a gradient for the menu
const startingColor = '#fba811';
const endingColor = '#f57317';
const scale = getScale(startingColor, endingColor);
const gradientColors = buttons.map((_, i) => scale((i + 1) / numOfButtons));
const darkenGradientColors = gradientColors.map(color => darken(color, 0.05));

export default function Menu() {
  const isGamePlaying = usePlayCheck();
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
  const menuItemCX = classNames('menu_item', Styles.MenuItemCSS.className, {
    [Styles.MenuItemHideCSS.className]:
      !isMenuOpen || (!isMenuOpen && isGamePlaying),
  });

  return (
    <>
      {/* add an overlay to the entire page, so the menu is clearly visible on ANY page/game */}
      {isMenuOpen && <div className={Styles.MenuOverlayCSS.className} />}

      <div ref={ref} className={Styles.MenuContainerCSS.className}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{ display: 'none' }}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>

        <Button
          rounded
          size="lg"
          Icon={isMenuOpen ? RiCloseFill : RiMenuFill}
          color="white"
          bgColor={startingColor}
          className={[
            'menu_toggler',
            Styles.MenuTogglerCSS.className,
            isGamePlaying && !isMenuOpen && Styles.MenuTogglerHideCSS.className,
          ]}
          onClick={() =>
            storeDispatch({
              type: isMenuOpen ? 'Close_Menu' : 'Open_Menu',
            })
          }
        />

        <Popup
          hideArrow
          placement="left"
          delayShow={150}
          content="Go Home"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[0]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[0]} className={menuItemCX}>
              <Link href="/" passHref>
                <Button
                  as="a"
                  rounded
                  size="lg"
                  Icon={RiHome2Fill}
                  color="white"
                  bgColor={gradientColors[0]}
                />
              </Link>
            </animated.div>
          }
        />

        <Popup
          hideArrow
          placement="left"
          delayShow={150}
          content="View Games"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[1]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[1]} className={menuItemCX}>
              <Link href="/games" passHref>
                <Button
                  as="a"
                  rounded
                  size="lg"
                  Icon={RiGamepadFill}
                  color="white"
                  bgColor={gradientColors[1]}
                />
              </Link>
            </animated.div>
          }
        />

        <Popup
          hideArrow
          placement="left"
          delayShow={150}
          content="View Settings"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[2]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[2]} className={menuItemCX}>
              <Button
                rounded
                size="lg"
                Icon={RiSettings4Fill}
                color="white"
                bgColor={gradientColors[2]}
                onClick={console.log}
              />
            </animated.div>
          }
        />

        <Popup
          hideArrow
          placement="left"
          delayShow={150}
          content="Handpick Lessons"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[3]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[3]} className={menuItemCX}>
              <Button
                rounded
                size="lg"
                Icon={RiFileSearchFill}
                color="white"
                bgColor={gradientColors[3]}
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
          hideArrow
          placement="left"
          delayShow={150}
          content="Edit Current Data"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[4]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[4]} className={menuItemCX}>
              <Button
                rounded
                size="lg"
                Icon={RiFileSettingsFill}
                color="white"
                bgColor={gradientColors[4]}
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
          hideArrow
          placement="left"
          delayShow={150}
          content="Create Custom Lesson"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[5]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[5]} className={menuItemCX}>
              <Button
                rounded
                size="lg"
                Icon={RiFileTransferFill}
                color="white"
                bgColor={gradientColors[5]}
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
          hideArrow
          placement="left"
          delayShow={150}
          content="View Past Lessons"
          tooltipContainerCx={Styles.MenuItemPopupCSS.className}
          addStyles={{
            background: `linear-gradient(to left, ${darkenGradientColors[6]} 50%, #b65b06)`,
          }}
          owner={
            <animated.div style={springs[6]} className={menuItemCX}>
              <Button
                rounded
                size="lg"
                Icon={RiFileShield2Fill}
                color="white"
                bgColor={gradientColors[6]}
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
        {Styles.MenuTogglerHideCSS.styles}
        {Styles.MenuItemCSS.styles}
        {Styles.MenuItemHideCSS.styles}
        {Styles.MenuItemPopupCSS.styles}
        {Styles.MenuOverlayCSS.styles}
      </div>
    </>
  );
}
