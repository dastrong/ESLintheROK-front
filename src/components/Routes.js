import React, { useEffect, useMemo } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import RouteTransition from "./RouteTransitions";
import Home from "./Home";
import FAQ from "./FAQ";
import About from "./About";
import Contact from "./Contact";
import Games from "./Games";
import Instructions from "./Instructions";
import DataPage from "./DataPage";
import ChooseLessonPage from "./ChooseLessonPage";
import GamePage from "./GamePage";
import HomeAPI from "./HomeAPI";
import Error from "./Error";
import WithStoreAndInfo from "./reusable/WithStoreAndInfo";
import ConfirmBox from "./reusable/ConfirmBox";
import TextLink from "./reusable/TextLink";
import CheckGameWrapper from "./reusable/CheckGameWrapper";
import { games } from "../helpers/data";
import { useStore } from "../store";

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
    console.log("google effects here");
  }, [pathname]);

  const shortenedRoute = shortenGameRoute(pathname);
  const gameInfo = useMemo(() => {
    if (!shortenedRoute.startsWith("/game/")) return;
    return games.find(({ router }) => router.path === shortenedRoute);
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
        <Route exact path="/lessons" component={ChooseLessonPage} />
        <Route exact path="/api" component={HomeAPI} />
        <Route exact path="/api/data" component={ChooseLessonPage} />
        <Route
          exact
          path="/game/:name/teacher"
          render={() => (
            <CheckGameWrapper isGameFound={!!gameInfo}>
              <Instructions
                isGameReady={isGameReady}
                gameInfo={gameInfo}
                options={["forTeachers", "right", "slideLeft"]}
              />
            </CheckGameWrapper>
          )}
        />
        <Route
          exact
          path="/game/:name/student"
          render={() => (
            <CheckGameWrapper isGameFound={!!gameInfo}>
              <Instructions
                isGameReady={isGameReady}
                gameInfo={gameInfo}
                options={["forStudents", "left", "slideRight"]}
              />
            </CheckGameWrapper>
          )}
        />
        <Route
          exact
          path="/game/:name"
          render={({ location }) => (
            <CheckGameWrapper isGameFound={!!gameInfo}>
              <WithStoreAndInfo gameInfo={gameInfo} path={location.pathname}>
                <GamePage />
              </WithStoreAndInfo>
            </CheckGameWrapper>
          )}
        />
        <Route
          exact
          path="/game/:name/play"
          render={({ location }) =>
            isGameReady ? (
              <>
                <CheckGameWrapper isGameFound={!!gameInfo}>
                  <WithStoreAndInfo gameInfo={gameInfo} path={location.pathname}>
                    <gameInfo.router.component />
                  </WithStoreAndInfo>
                </CheckGameWrapper>
                <FullScreenConfirmBox />
              </>
            ) : (
              <Error
                header="Whoa, you need some data to play."
                content={<NoDataErrMsg />}
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

const NoDataErrMsg = () => (
  <p>
    Go back to the
    <TextLink path="lessons" text=" lessons " />
    page or enter your own data
    <TextLink path="data" text=" here" />.
  </p>
);

const FullScreenConfirmBox = () => (
  <ConfirmBox
    open={window.screen.height !== window.innerHeight}
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
