import React, { useState, useCallback } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Button, Icon, Step } from "semantic-ui-react";
import useDocumentTitle from "hooks/useDocumentTitle";
import useEventListener from "hooks/useEventListener";
import { useStore } from "store";
import "./GameInstructions.css";

export default function InstructionsPage({ isGameReady, gameInfo, options }) {
  const { showSideBar } = useStore()[0];

  const [forPerson, direction, transitionClass] = options;
  const { router, info } = gameInfo;
  const instructions = gameInfo.instructions[forPerson];

  useDocumentTitle(`${info.title} - ESL in the ROK`);
  const [index, setIndex] = useState(0);
  const [language, setLanguage] = useState("english");

  const isEnglish = language === "english";
  const startBtn = classNames("massive", { disabled: !isGameReady });
  const btnsCX = classNames("game-instructions-buttons", {
    "game-instructions-buttons-reverse": forPerson === "forTeachers",
  });

  const handleIndex = useCallback(
    (upOrDown = 1) => {
      const length = instructions[language].length;
      const newIndex = (index + upOrDown + length + 1) % (length + 1);
      setIndex(newIndex);
    },
    [index, instructions, language]
  );

  const handleKeys = useCallback(
    ({ keyCode }) => {
      // spacebar/enter/rightArrow was clicked; next index
      if (keyCode === 32 || keyCode === 13 || keyCode === 39) return handleIndex();
      // E clicked; change language to English
      if (keyCode === 69) {
        if (isEnglish) return;
        return setLanguage("english");
      }
      // K clicked; change language to Korean
      if (keyCode === 75) {
        if (!isEnglish) return;
        return setLanguage("korean");
      }
      // left arrow was clicked; decrease the index
      if (keyCode === 37) return handleIndex(-1);
    },
    [handleIndex, isEnglish]
  );
  useEventListener("keydown", handleKeys);

  const handleScroll = useCallback(
    ({ type, buttons, deltaY }) => {
      if (showSideBar) return;
      if (type === "wheel") {
        if (buttons) return;
        return deltaY < 0 ? handleIndex() : handleIndex(-1);
      }
    },
    [handleIndex, showSideBar]
  );
  useEventListener("wheel", handleScroll);

  return (
    <div className="game-instructions-container">
      <Steps instructions={instructions[language]} index={index} setIndex={setIndex} />

      <ul className="game-instructions-list" onClick={() => handleIndex()}>
        {index === 0 ? (
          instructions[language].map(item => <li key={item}>{item}</li>)
        ) : (
          <li className="game-instructions-list-single">
            {instructions[language][index - 1]}
          </li>
        )}
      </ul>

      <div className={btnsCX}>
        <Button
          icon
          as={Link}
          to={{ pathname: `${router.path}`, state: { pageTransition: transitionClass } }}
          size="massive"
          color="blue"
          labelPosition={direction}
        >
          <Icon size="large" name={`angle ${direction}`} />
          BACK
        </Button>

        <Button
          as={Link}
          to={{ pathname: `${router.path}/play`, state: { pageTransition: "slideUp" } }}
          className={startBtn}
          color="green"
          content="START"
        />

        <Button
          size="massive"
          color="orange"
          onClick={() => setLanguage(isEnglish ? "korean" : "english")}
          content={isEnglish ? "한국어" : "ENGLISH"}
        />
      </div>

      <img src={info.image} alt={info.title} />
      <img src={info.image} alt={info.title} />
    </div>
  );
}

// creates step for instructions
// adds an ALL step to view a blob of all the instructions
const Steps = ({ instructions, index, setIndex }) => (
  <Step.Group fluid onClick={e => setIndex(Number(e.target.id))}>
    {["ALL", ...instructions].map((x, i) => (
      <Step key={i} active={index === i} id={i} link>
        <Step.Content>
          <Step.Title id={i}>{i ? i : x}</Step.Title>
        </Step.Content>
      </Step>
    ))}
  </Step.Group>
);
