import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { animated, useSpring, config } from 'react-spring';

import Button from 'components/Button';
import * as Styles from './CookieConsent.styles';
import { analytics, consent } from 'utils/analytics';

export default function CookieConsent() {
  const [animate, setAnimate] = useState(true);
  const [visibility, setVisibility] = useState(false);

  const containerSpring = useSpring({
    y: visibility ? 0 : 200,
    config: config.wobbly,
    immediate: visibility,
    onRest: () => setAnimate(visibility),
  });

  // check if user has already consented
  useEffect(() => {
    const consentValue = consent.get(); // undefined, 1, 0
    if (typeof consentValue === 'undefined') setVisibility(true);
    else if (Number(consentValue)) analytics.add(true);
    setAnimate(false);
  }, []);

  const onAccept = () => {
    analytics.add();
    setVisibility(false);
  };

  const onDecline = () => {
    analytics.remove();
    setVisibility(false);
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
