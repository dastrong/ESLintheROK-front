import React from "react";
import { Dropdown } from "semantic-ui-react";

export default ({ isServerAwake, onChange, placeholder, options, ...rest }) => (
  <Dropdown
    loading={!isServerAwake}
    disabled={!isServerAwake}
    onChange={onChange}
    placeholder={placeholder}
    options={options}
    {...rest}
  />
);
