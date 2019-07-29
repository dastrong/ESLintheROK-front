import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import Bowser from "bowser";
import ServiceWorker from "./components/ServiceWorker";
import MobileError from "./components/MobileError";
import BrowserError from "./components/BrowserError";
import App from "./components/App";
import "typeface-bree-serif";
import "typeface-mali";
import "typeface-niramit";
import "typeface-poppins";
import "typeface-muli";
import "typeface-quicksand";

const Site = () => {
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

ReactDOM.render(<Site />, document.getElementById("root"));
