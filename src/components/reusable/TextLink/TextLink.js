import React from "react";
import { Link } from "react-router-dom";

export default ({ path, text }) => (
  <Link to={{ pathname: `/${path}`, state: { pageTransition: "slideUp" } }}>{text}</Link>
);
