import React, { useEffect, useMemo } from "react";
import ReactGA from "react-ga";
import { Route, withRouter, Switch } from "react-router-dom";
import RouteTransition from "./RouteTransitions";
import GameVerifier from "./GameVerifier";
import About from "../About";
import Contact from "../Contact";
import DataPage from "../DataPage";
import Error from "../Error";
import FAQ from "../FAQ";
import Games from "../Games";
import GameHome from "../GameHome";
import GameInstructions from "../GameInstructions";
import Home from "../Home";
import HomeAPI from "../HomeAPI";
import LessonsPage from "../LessonsPage";
import GameWrapper from "@Reusable/GameWrapper";
import ConfirmBox from "@Reusable/ConfirmBox";
import TextLink from "@Reusable/TextLink";
import gamesInfo from "helpers/gamesInfo";
import { useStore } from "store";

// when the user alternates through the different game routes (teacher, student, etc.)
// we'll save the gameInfo here and save the results to avoid filtering through
// every game on each page
// *viewed as a performance optimization as further games will be added
function shortenGameRoute(pathname) {
  const lastSlashPosition = pathname.indexOf("/", 6);
  const lastSlashIndex = lastSlashPosition > 0 ? lastSlashPosition : pathname.length;
  return pathname.substring(0, lastSlashIndex);
}

function Routes({ history, location }) {
  const [{ isGameReady }, dispatch] = useStore();
  const { pathname } = location;

  useEffect(() => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }, [pathname]);

  const shortenedRoute = shortenGameRoute(pathname);
  const gameInfo = useMemo(() => {
    if (!shortenedRoute.startsWith("/game/")) return;
    return gamesInfo.find(({ router }) => router.path === shortenedRoute);
  }, [shortenedRoute]);

  return (
    <RouteTransition isBack={history.action === "POP"} location={location}>
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/data" component={DataPage} />
        <Route exact path="/lessons" component={LessonsPage} />
        <Route exact path="/api" component={HomeAPI} />
        <Route exact path="/api/data" component={LessonsPage} />
        <Route
          exact
          path="/game/:name/teacher"
          render={() => (
            <GameVerifier isGameFound={!!gameInfo}>
              <GameInstructions
                isGameReady={isGameReady}
                gameInfo={gameInfo}
                options={["forTeachers", "right", "slideLeft"]}
              />
            </GameVerifier>
          )}
        />
        <Route
          exact
          path="/game/:name/student"
          render={() => (
            <GameVerifier isGameFound={!!gameInfo}>
              <GameInstructions
                isGameReady={isGameReady}
                gameInfo={gameInfo}
                options={["forStudents", "left", "slideRight"]}
              />
            </GameVerifier>
          )}
        />
        <Route
          exact
          path="/game/:name"
          render={({ location }) => (
            <GameVerifier isGameFound={!!gameInfo}>
              <GameWrapper gameInfo={gameInfo} path={location.pathname}>
                <GameHome />
              </GameWrapper>
            </GameVerifier>
          )}
        />
        <Route
          exact
          path="/game/:name/play"
          render={({ location }) =>
            isGameReady ? (
              <>
                <GameVerifier isGameFound={!!gameInfo}>
                  <GameWrapper gameInfo={gameInfo} path={location.pathname}>
                    {gameInfo && <gameInfo.router.component />}
                  </GameWrapper>
                </GameVerifier>
                <FullScreenConfirmBox />
              </>
            ) : (
              <Error
                header="Whoa, you need some data to play."
                content={<NoDataErrMsg dispatch={dispatch} />}
              />
            )
          }
        />
        <Route component={Error} />
      </Switch>
    </RouteTransition>
  );
}

export default withRouter(Routes);

const NoDataErrMsg = ({ dispatch }) => (
  <p>
    Choose a lesson
    <TextLink path="lessons" text=" here" />
    , enter your own data
    <TextLink path="data" text=" here " />
    or choose one of your past lessons{" "}
    <button onClick={() => dispatch({ type: "togglePastLessons", bool: true })}>
      here
    </button>
  </p>
);

const FullScreenConfirmBox = () => (
  <ConfirmBox
    open={
      process.env.NODE_ENV !== "development" &&
      window.screen.height !== window.innerHeight
    }
    onConfirm={
      typeof InstallTrigger !== "undefined"
        ? () => document.documentElement.mozRequestFullScreen()
        : () => document.documentElement.webkitRequestFullScreen()
    }
    cancelButton="No, thanks."
    confirmButton="Do it."
    header="Games should be played in fullscreen"
    content={
      <div>
        <p>You can toggle fullscreen with F11 by yourself too.</p>
        <p>
          <span>Note:</span> If you get a white screen next, contact me because this
          should've fixed it.
        </p>
      </div>
    }
  />
);
