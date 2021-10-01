import React, { useEffect } from 'react';
import { Router } from 'next/router';
import nProgress from 'nprogress';

export default function LoadingBar() {
  useEffect(() => {
    Router.events.on('routeChangeStart', nProgress.start);
    Router.events.on('routeChangeError', nProgress.done);
    Router.events.on('routeChangeComplete', nProgress.done);

    return () => {
      Router.events.on('routeChangeStart', nProgress.start);
      Router.events.on('routeChangeError', nProgress.done);
      Router.events.on('routeChangeComplete', nProgress.done);
    };
  }, []);

  return (
    <style jsx global>{`
      /* Make clicks pass-through */
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: #04a7fb;
        position: fixed;
        z-index: 111111111111;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }

      /* Fancy blur effect */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #04a7fb, 0 0 5px #04a7fb;
        opacity: 1;

        transform: rotate(3deg) translate(0px, -4px);
      }

      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }

      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }

      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  );
}
