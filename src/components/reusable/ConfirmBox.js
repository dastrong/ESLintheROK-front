import React, { useState } from "react";
import { Confirm } from "semantic-ui-react";
import "./ConfirmBox.css";

export default function({ open, onCancel = () => {}, onConfirm = () => {}, ...props }) {
  const [isOpen, setIsOpen] = useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function handleActions(callback) {
    setIsOpen(false);
    callback();
  }

  return (
    <Confirm
      className="confirm-box"
      open={isOpen}
      onCancel={() => handleActions(onCancel)}
      onConfirm={() => handleActions(onConfirm)}
      {...props}
    />
  );
}
