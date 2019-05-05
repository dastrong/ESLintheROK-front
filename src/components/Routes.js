import React, { useEffect } from "react";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import RouteTransition from "./RouteTransitions";
import Home from "./Home";
import FAQ from "./FAQ";
import About from "./About";
import Contact from "./Contact";
import Games from "./Games";
import InstructionsPage from "./pages/InstructionsPage";
import DataPage from "./DataPage";
import ChooseLessonPage from "./ChooseLessonPage";
import GamePage from "./pages/GamePage";
import HomeAPI from "./HomeAPI";
import Error from "./Error";

const Routes = ({ history, location }) => {
  const { pathname } = location;

  useEffect(() => {
    // track google events here
    console.log("effect");
  }, [pathname]);

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
        <Route exact path="/game/:name" component={GamePage} />
        <Route exact path="/game/:name/teacher" component={InstructionsPage} />
        <Route exact path="/game/:name/student" component={InstructionsPage} />
        {/* <Route exact path='/game/:name/play' component={} /> */}
        <Route component={Error} />
      </Switch>
    </RouteTransition>
  );
};

export default withRouter(Routes);

//             {gameData && (
//               <Fragment>
//                 <Route
//                   exact
//                   path={gameData.router.path}
//                   render={() => (
//                     <GamePage
//                       title={`Home - ${gameData.info.title}`}
//                       gameData={gameData}
//                       changeFont={changeFont}
//                       font={font}
//                       isGameReady={isGameReady}
//                     />
//                   )}
//                 />
//                 <Route
//                   exact
//                   path={`${gameData.router.path}/teacher`}
//                   render={() => (
//                     <InstructionsPage
//                       title={`Teacher Instructions - ${gameData.info.title}`}
//                       forPerson="forTeachers"
//                       direction="right"
//                       transitionClass="slideLeft"
//                       path={gameData.router.path}
//                       isGameReady={isGameReady}
//                     />
//                   )}
//                 />
//                 <Route
//                   exact
//                   path={`${gameData.router.path}/student`}
//                   render={() => (
//                     <InstructionsPage
//                       title={`Student Instructions - ${gameData.info.title}`}
//                       forPerson="forStudents"
//                       direction="left"
//                       transitionClass="slideRight"
//                       path={gameData.router.path}
//                       isGameReady={isGameReady}
//                     />
//                   )}
//                 />
//                 <Route
//                   exact
//                   path={`${gameData.router.path}/start`}
//                   render={() =>
//                     !isGameReady ? (
//                       <Fragment>
//                         <PageHeader
//                           icon="exclamation"
//                           text="Report reoccuring errors"
//                           color="red"
//                         />
//                         <ErrorPage
//                           header="Whoops, no data to play. Using the refresh button will lose your data."
//                           content={
//                             <p>
//                               Go back to the
//                               {
//                                 <Link
//                                   to={{
//                                     pathname: "/lessons",
//                                     state: { pageTransition: "slideUp" },
//                                   }}
//                                 >
//                                   {" "}
//                                   lessons{" "}
//                                 </Link>
//                               }
//                               page or enter your own data
//                               {
//                                 <Link
//                                   to={{
//                                     pathname: "/data",
//                                     state: { pageTransition: "slideUp" },
//                                   }}
//                                 >
//                                   {" "}
//                                   here
//                                 </Link>
//                               }
//                               .
//                             </p>
//                           }
//                         />
//                       </Fragment>
//                     ) : (
//                       <Fragment>
//                         <gameData.router.component
//                           title={gameData.info.title}
//                           expressions={expressions}
//                           vocabulary={vocabulary}
//                           dataUpdated={dataUpdated}
//                           isMenuOpen={isMenuOpen}
//                           colors={colors}
//                           font={font}
//                           isGameReady={isGameReady}
//                         />
//                         <ConfirmBox
//                           open={window.screen.height !== window.innerHeight}
//                           onConfirm={
//                             typeof InstallTrigger !== "undefined"
//                               ? () => document.documentElement.mozRequestFullScreen()
//                               : () => document.documentElement.webkitRequestFullScreen()
//                           }
//                           cancelText="No, thanks."
//                           confirmText="Do it."
//                           header={`${gameData.info.title} should be played in fullscreen`}
//                           content={
//                             <div style={{ padding: "10px" }}>
//                               <p>You can toggle fullscreen with F11 by yourself too.</p>
//                               <p>
//                                 <span style={{ fontWeight: "bold" }}>Note:</span> If you
//                                 get a white screen next, contact me because this should've
//                                 fixed it.
//                               </p>
//                             </div>
//                           }
//                         />
//                       </Fragment>
//                     )
//                   }
//                 />
//               </Fragment>
//             )}
//
