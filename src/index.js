import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import MobileError from "./components/MobileError";
import IEError from "./components/IEError";
import App from "./components/App";
import "typeface-bree-serif";
import "typeface-mali";
import "typeface-niramit";
import "typeface-poppins";
import "typeface-muli";
import "typeface-quicksand";

const Site = () =>
  window.innerWidth < 768 ? (
    <MobileError />
  ) : !!document.documentMode ? (
    <IEError />
  ) : (
    <App />
  );

ReactDOM.render(<Site />, document.getElementById("root"));
registerServiceWorker();
