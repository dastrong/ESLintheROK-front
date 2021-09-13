import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies, { CookieAttributes } from 'js-cookie';
import { animated, useSpring, config } from 'react-spring';

import Button from 'components/Button';
import * as Styles from './CookieConsent.styles';
import { initializeAnalytics } from 'utils/analytics';

const cookieName = 'cookie_consent';
const cookieOptions: CookieAttributes = {
  expires: 365,
  secure: !!(process.env.NODE_ENV === 'production'),
  sameSite: 'strict',
};

export default function CookieConsent() {
  const [animate, setAnimate] = useState(true);
  const [visibility, setVisibility] = useState(false);

  const containerSpring = useSpring({
    y: visibility ? 0 : 200,
    config: config.wobbly,
    immediate: visibility,
    onRest: () => setAnimate(visibility),
  });

  // check if user has already accepted/declined
  useEffect(() => {
    const wasAccepted = getCookieValue();

    if (wasAccepted) initializeAnalytics();
    // if the user has already denied it, do nothing
    else if (!(typeof wasAccepted === 'boolean')) setVisibility(true);
  }, []);

  const onAccept = () => {
    initializeAnalytics();
    setCookieValue(true);
    setVisibility(false);
  };

  const onDecline = () => {
    // remove google analytics cookies
    Cookies.remove('_ga');
    Cookies.remove('_gat');
    Cookies.remove('_gid');
    setCookieValue(false);
    setVisibility(false);
  };

  const getCookieValue = () => {
    return Cookies.get(cookieName);
  };

  const setCookieValue = (value: boolean) => {
    Cookies.set(cookieName, String(value), cookieOptions);
  };

  if (!visibility && !animate) return null;

  return (
    <animated.div
      style={containerSpring}
      className={Styles.ContainerCSS.className}
    >
      <span className={Styles.TextCSS.className}>
        We would like to use Google Analytics{' '}
        <Link href="/privacy">
          <a>cookies</a>
        </Link>{' '}
        to analyze how our Site is used. You can accept or decline the use of
        these cookies by clicking a button to the right.
      </span>
      <div className={Styles.ButtonsCSS.className}>
        <Button
          inverted
          rounded
          color="white"
          bgColor="red"
          text="Decline"
          style={{ width: '50%', marginRight: '0.5rem' }}
          onClick={onDecline}
        />
        <Button
          rounded
          color="white"
          bgColor="green"
          text="Accept"
          style={{ width: '50%' }}
          onClick={onAccept}
        />
      </div>

      {Styles.ContainerCSS.styles}
      {Styles.TextCSS.styles}
      {Styles.ButtonsCSS.styles}
    </animated.div>
  );
}
