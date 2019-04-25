import React, { PureComponent, Fragment } from "react";
import classNames from "classnames";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import InfoModal from "../InfoModal";
import "../../styles/pages/GamePage.css";

class GamePage extends PureComponent {
  componentDidMount() {
    document.title = `${this.props.title} - ESL in the ROK`;
  }

  render() {
    const { isGameReady, gameData, font, changeFont } = this.props;
    const startBtn = classNames("start-btn circular", { disabled: !isGameReady });
    const tooltip = !isGameReady && (
      <div className="tooltip">
        You need data to play!
        <span>
          Select a lesson{" "}
          {
            <Link
              to={{
                pathname: "/lessons",
                state: { pageTransition: "slideUp" },
              }}
            >
              {" "}
              here
            </Link>
          }{" "}
          or enter your own data{" "}
          {
            <Link
              to={{
                pathname: "/data",
                state: { pageTransition: "slideUp" },
              }}
            >
              {" "}
              here
            </Link>
          }
        </span>
      </div>
    );
    return (
      <Fragment>
        <InfoModal
          opacity={1}
          gameData={gameData}
          changeFont={changeFont}
          font={font}
          path={gameData.router.path}
        />
        <div className="gamePage-container">
          <img src={gameData.info.images.topText} alt="game logo" />
          <div>
            {tooltip}
            <div className="gamePage-buttons">
              <Button
                as={Link}
                to={{
                  pathname: `${gameData.router.path}/teacher`,
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
                  pathname: `${gameData.router.path}/student`,
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
                  pathname: `${gameData.router.path}/start`,
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
      </Fragment>
    );
  }
}

export default GamePage;
