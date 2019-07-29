import React, { useState, Fragment } from "react";
import ReactGA from "react-ga";
import { Header, Icon, Modal, Popup, Dropdown } from "semantic-ui-react";
import fonts from "../helpers/fonts";
import "./InfoModal.css";

const HotKeys = ({ keyCuts }) =>
  keyCuts.map((x, i) => (
    <div className="info-modal-item" key={i}>
      <div className="info-modal-item-key">
        {/* if there's more than one keyCut add a space */}
        {typeof x.key !== "string"
          ? x.key.map(d => (
              <Fragment key={d}>
                {d} <br />
              </Fragment>
            ))
          : x.key}
      </div>
      <div className="info-modal-item-des">{x.description}</div>
    </div>
  ));

export default function InfoModal({
  font,
  dispatch,
  opacity,
  path,
  keyCuts,
  title,
  attachments,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    ReactGA.event({
      category: "Modal",
      action: `Clicked ${path} Modal`,
      label: path,
    });
    setIsOpen(!isOpen);
  }

  const icon = (
    <Icon
      link
      className="info-modal-icon"
      size="huge"
      name="help circle"
      onClick={handleClick}
      style={{ opacity: opacity }}
    />
  );
  const opener = !opacity ? (
    icon
  ) : (
    <Popup
      wide="very"
      trigger={icon}
      content={
        <Fragment>
          <h3>{title} Help</h3>
          <p>You can view these in game too.</p>
          <p>Just hover up here and click.</p>
          <p>
            <span style={{ fontWeight: "bold" }}>Note:</span> Each game has different
            helpers
          </p>
        </Fragment>
      }
      position="bottom center"
      horizontalOffset={-12}
    />
  );

  return (
    <div>
      {opener}
      <Modal
        open={isOpen}
        className="info-modal"
        onClose={() => setIsOpen(false)}
        closeIcon
      >
        <Header textAlign="center">
          <Icon name="info" />
          {`${title} Options`}
          {attachments && (
            <Icon
              link
              name="download"
              onClick={() =>
                window.open(
                  "https://drive.google.com/drive/folders/1gaVcobvZ3zPp-EsGlfQr9_yQh97k7IQn?usp=sharing",
                  "_blank"
                )
              }
            />
          )}
        </Header>
        <Dropdown
          fluid
          selection
          onChange={(e, { value }) => dispatch({ type: "setFont", font: value })}
          placeholder={`Select a new font (Current Font: ${font.slice(
            0,
            font.indexOf(",")
          )})`}
          options={fonts}
        />
        <Modal.Content>
          <div className="info-modal-container">
            <div className="info-modal-item header">
              <div className="info-modal-item-key">Shortcut</div>
              <div className="info-modal-item-des">Description</div>
            </div>
            <HotKeys keyCuts={keyCuts} />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}
