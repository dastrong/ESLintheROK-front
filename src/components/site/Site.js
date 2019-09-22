import React from "react";
import Bowser from "bowser";
import ServiceWorker from "./ServiceWorker";
import MobileError from "./MobileError";
import BrowserError from "./BrowserError";
import App from "../app";

export default () => {
  // checking IE first, so we can avoid adding IE polyfills for Bowser
  const isIE = !!document.documentMode;
  const isEdgeOrIE =
    isIE ||
    !Bowser.getParser(window.navigator.userAgent).satisfies({
      chrome: ">35",
      firefox: ">41",
      opera: ">22",
      safari: ">10",
    });

  return window.innerWidth < 768 ? (
    <MobileError />
  ) : isEdgeOrIE ? (
    <BrowserError />
  ) : (
    <>
      <ServiceWorker />
      <App />
    </>
  );
};
