import React from "react";
import classNames from "classnames";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useDocumentTitle from "hooks/useDocumentTitle";
import TextLink from "@Reusable/TextLink";
import PageHeader from "@Reusable/PageHeader/index";
import "./GameHome.css";

const ToolTip = ({ isGameReady }) => {
  if (isGameReady) return null;
  return (
    <div className="tooltip">
      You need data to play!
      <span>
        Select a lesson
        <TextLink path="lessons" text=" here " />
        or enter your own data
        <TextLink path="data" text=" here." />
      </span>
    </div>
  );
};

export default function GameHome({ title, image, isGameReady, path, icon }) {
  useDocumentTitle(`${title} - ESL in the ROK`);

  const startBtn = classNames("start-btn circular", { disabled: !isGameReady });
  return (
    <>
      <PageHeader icon={icon} text={title} />
      <div className="game-home-container">
        <img src={image} alt="game logo" />
        <>
          <ToolTip isGameReady={isGameReady} />
          <div className="game-home-buttons">
            <Button
              as={Link}
              to={{
                pathname: `${path}/teacher`,
                state: { pageTransition: "slideRight" },
              }}
              className="left-btn outer-btn huge"
              color="blue"
              icon
              labelPosition="left"
            >
              <Icon size="large" name="angle left" />
              TEACHER
              <br />
              <span>INSTRUCTIONS</span>
            </Button>
            <Button
              as={Link}
              to={{
                pathname: `${path}/student`,
                state: { pageTransition: "slideLeft" },
              }}
              className="right-btn outer-btn huge"
              color="blue"
              icon
              labelPosition="right"
            >
              STUDENT
              <br />
              <span>INSTRUCTIONS</span>
              <Icon size="large" name="angle right" />
            </Button>
            <Button id="disabled-backer" className="start-btn circular" />
            <Button
              as={Link}
              to={{
                pathname: `${path}/play`,
                state: { pageTransition: "slideUp" },
              }}
              className={startBtn}
              color="green"
            >
              START
            </Button>
          </div>
        </>
      </div>
    </>
  );
}
