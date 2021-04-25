import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { animated, useSpring } from 'react-spring';

const config = {
  from: { rotate: 225 },
  to: { rotate: -1225 },
  config: { duration: 750 },
  delay: 125,
  to: { rotate: -495 },
  config: { duration: 250 },
  delay: 0,
};

export default function LayoutLogo() {
  const { asPath } = useRouter();

  const [circleStyles, circleRef] = useSpring(config, [asPath]);

  useEffect(() => {
    circleRef.current[0].start(config);
  }, [asPath]);

  return (
    <Link href="/">
      <a>
        <span className="text_ESL">ESL</span>
        <div className="icon">
          <span className="text_in">in</span>
          <animated.svg
            style={circleStyles}
            width="65"
            height="65"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50.0001 24.9998c0 .4134-.0193.8222-.057 1.2255C49.0688 39.5048 38.2355 50 25.0001 50 11.7646 50 .931341 39.5048.0570082 26.2253.661375 32.6948 6.00161 37.7549 12.5001 37.7549c6.9035 0 12.5-5.7106 12.5-12.7551 0-.1708-.0033-.3409-.0099-.5101h.0197c.2624-6.808 5.754-12.2449 12.4902-12.2449 6.7361 0 12.2277 5.4369 12.4901 12.2449h.0099v.0001c0 .0997-.0006.1993-.0017.2988.0011.0703.0017.1407.0017.2112zM.00987678 24.4897H.00006104v.0001c0 .0997.00056099.1993.00167992.2988.00159013-.0999.0043062-.1996.00813582-.2989z"
              fill="#B5323C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M.00004876 24.9999c0-.4135.01928334-.8225.05699154-1.226C.931708 10.4948 11.7648-.00000156 25-.00000156c13.2353 0 24.0684 10.49480156 24.9431 23.77390156-.6046-6.4693-5.9448-11.5291-12.4431-11.5291-6.9035 0-12.5 5.7107-12.5 12.7551 0 .1709.0033.341.0099.5102h-.0197C24.7278 32.318 19.2361 37.755 12.5 37.755 5.76395 37.755.272323 32.318.00986779 25.5101H.00004876c0-.0997.00056457-.1994.00168228-.2988-.0011177-.0704-.00168228-.1408-.00168228-.2114zM49.9902 25.5101H50c0-.0997-.0005-.1994-.0016-.2988-.0016.0999-.0043.1995-.0082.2988z"
              fill="#0047A0"
            />
          </animated.svg>
          <span className="text_the">the</span>
        </div>
        <span className="text_ROK">ROK</span>

        <style jsx>{`
          a {
            display: flex;
            align-items: center;
            font-size: 1.9rem;
            text-decoration: none;
            color: #585858;
            margin: 0 1.3rem;
            font-weight: bold;
          }

          a > span {
            position: relative;

            margin: 0;
          }

          a > span:after,
          a > span:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;

            opacity: 0;
          }

          a > span:first-child:before {
            bottom: -2px;
            left: -5px;
            height: 89%;
            width: 3px;
            background-color: #0047a0;
          }
          a > span:first-child:after {
            bottom: -2px;
            left: -5px;
            width: 110%;
            background-color: #0047a0;
          }
          a > span:last-child:before {
            top: 0px;
            right: -5px;
            width: 105%;
            background-color: #b5323c;
          }
          a > span:last-child:after {
            top: 0px;
            right: -5px;
            height: 89%;
            width: 3px;
            background-color: #b5323c;
          }

          .text_ESL {
            margin-bottom: 5px;
          }

          .text_ROK {
            margin-top: 5px;
          }

          .icon {
            height: 65px;
            position: relative;
            margin: 0 0.5rem;
          }

          svg {
            height: 65px;
            width: 65px;
            transform: rotate(215deg);
          }

          .icon span {
            font-size: 1.1rem;
            font-weight: normal;
            position: absolute;
            color: #eee;
            z-index: 1;
          }

          .icon span.text_in {
            top: 16px;
            left: 12px;
          }

          .icon span.text_the {
            bottom: 14px;
            right: 8px;
          }
        `}</style>
      </a>
    </Link>
  );
}
