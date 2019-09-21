import React from "react";
import classNames from "classnames";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextLink from "@Reusable/TextLink";
import useDocumentTitle from "hooks/useDocumentTitle";
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

export default function Game({ title, image, isGameReady, path }) {
  useDocumentTitle(`${title} - ESL in the ROK`);

  const startBtn = classNames("start-btn circular", { disabled: !isGameReady });
  return (
    <>
      <div className="game-home-container">
        <img src={image} alt="game logo" />
        <div>
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
            <Button className="disabled-backer start-btn circular" />
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
        </div>
      </div>
    </>
  );
}
