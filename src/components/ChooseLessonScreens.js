import React from "react";
import { CSSTransition } from "react-transition-group";
import ChooseGrade from "./ChooseGrade";
import ChooseBook from "./ChooseBook";
import Data from "./Data";

const Transition = ({ isIn, cx, timeout, children }) => (
  <CSSTransition
    in={isIn}
    classNames={`${cx}-screen`}
    timeout={timeout}
    mountOnEnter={true}
    unmountOnExit={true}
  >
    {children}
  </CSSTransition>
);

const First = ({ isIn, options, handleGradeSelection, isServerAwake, placeholder }) => (
  <Transition isIn={isIn} cx="first" timeout={{ exit: 500 }}>
    <div className="first-screen">
      What grade are you looking for?
      <ChooseGrade
        selection
        compact
        onChange={handleGradeSelection}
        isServerAwake={isServerAwake}
        placeholder={placeholder}
        options={options}
      />
    </div>
  </Transition>
);

const Second = ({
  isIn,
  isAPI,
  options,
  handleGradeSelection,
  books,
  activeGrade,
  setScreen,
  setPostURL,
  setData,
}) => (
  <Transition isIn={isIn} cx="second" timeout={800}>
    <div className="second-screen">
      <span className="current-grade">
        Showing Books for Grade:
        <ChooseGrade
          inline
          options={options}
          placeholder={String(activeGrade.num)}
          onChange={handleGradeSelection}
          isServerAwake={true}
        />
      </span>
      <ChooseBook
        books={books}
        activeGradeId={activeGrade.id}
        setPostURL={setPostURL}
        setScreen={setScreen}
        setData={setData}
        isAPI={isAPI}
      />
    </div>
  </Transition>
);

const Third = ({ isIn, isAPI, setScreen, postURL, data }) => (
  <Transition isIn={isIn} cx="third" timeout={0}>
    <Data isAPI={isAPI} setScreen={setScreen} postURL={postURL} data={data} />
  </Transition>
);

export { First, Second, Third };
