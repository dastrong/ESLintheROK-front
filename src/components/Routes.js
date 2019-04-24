import React, { useEffect } from "react";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import RouteTransition from "./RouteTransitions";
import InstructionsPage from "./pages/InstructionsPage";
import DataPage from "./pages/Data/DataPage";
import AboutPage from "./pages/Info/AboutPage";
import ContactPage from "./pages/Info/ContactPage";
import FAQPage from "./pages/Info/FAQPage";
import LessonsPage from "./pages/Lessons/LessonsPage";
import MainPage from "./pages/MainPage";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";
import HomeAPI from "./pages/HomeAPI";
import ErrorPage from "./pages/ErrorPage";
// import PageHeader from "./pages/PageHeader";
// import ConfirmBox from "./reusable/ConfirmBox";

const Routes = ({ history, location }) => {
  const { pathname } = location;

  useEffect(() => {
    // track google events here
    console.log("effect");
  }, [pathname]);

  console.log(window.swUpdated);

  return (
    <RouteTransition isBack={history.action === "POP"} location={location}>
      <Switch location={location}>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/faq" component={FAQPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/games" component={GamesPage} />
        <Route exact path="/data" component={DataPage} />
        <Route exact path="/lessons" component={LessonsPage} />
        <Route exact path="/api" component={HomeAPI} />
        <Route exact path="/api/data" component={LessonsPage} />
        <Route exact path="/game/:name" component={GamePage} />
        <Route exact path="/game/:name/teacher" component={InstructionsPage} />
        <Route exact path="/game/:name/student" component={InstructionsPage} />
        {/* <Route exact path='/game/:name/play' component={} /> */}
        <Route component={ErrorPage} />
      </Switch>
    </RouteTransition>
  );
};

export default withRouter(Routes);

// // class Routers extends PureComponent {
// const Routers = props => {
//   const {
//     vocabulary,
//     expressions,
//     isGameReady,
//     gameData,
//     sendData,
//     openDataModal,
//     colors,
//     font,
//     changeFont,
//     location,
//     history,
//     dataUpdated,
//     isMenuOpen,
//   } = props;
//   // returns an className for page transitions
//   const cx =
//     history.action === "POP"
//       ? "page page-slideDown"
//       : location.state
//       ? `page page-${location.state.pageTransition}`
//       : "page";
//   return (
//     <Fragment>
//       {window.swUpdated && (
//         <ConfirmBox
//           open={true}
//           header="ESL in the ROK has recently been updated"
//           content={
//             <p style={{ padding: "10px", margin: "0" }}>
//               Please refresh your browser to apply these changes
//             </p>
//           }
//           confirmText="Refresh"
//           cancelText="I don't like nice things."
//           onConfirm={() => window.location.reload()}
//         />
//       )}
//       <TransitionGroup
//         component={null}
//         // updates exit classes so animations are correct
//         childFactory={childFactoryCreator({
//           classNames: `${cx}`,
//           timeout: { enter: 1000, exit: 1000 },
//         })}
//       >
//         <CSSTransition
//           key={location.key}
//           classNames={cx}
//           timeout={{ enter: 1000, exit: 1000 }}
//           component="section"
//         >
//           <Switch>
//             <Route
//               exact
//               path="/"
//               render={() => <MainPage openDataModal={openDataModal} />}
//             />
//             <Route
//               exact
//               path="/data"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="cogs"
//                     text="Enter your own lesson data below"
//                     color="blue"
//                   />
//                   <DataPage
//                     vocabulary={vocabulary}
//                     expressions={expressions}
//                     isGameReady={isGameReady}
//                     sendData={sendData}
//                   />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/api"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="cogs"
//                     text="Enter a lesson for everyone to use"
//                     color="teal"
//                   />
//                   <HomeAPI />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/api/data"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="cogs"
//                     text="Enter a lesson for everyone to use"
//                     color="teal"
//                   />
//                   <LessonsPage isAPI={true} />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/games"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="game"
//                     text="Select a game for more information"
//                     color="blue"
//                   />
//                   <GamesPage />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/contact"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="mail"
//                     text="Connect with other teachers"
//                     color="blue"
//                   />
//                   <ContactPage />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/about"
//               render={() => (
//                 <Fragment>
//                   <PageHeader icon="user" text="Learn more about us" color="blue" />
//                   <AboutPage />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/faq"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="question"
//                     text="View frequently asked questions"
//                     color="blue"
//                   />
//                   <FAQPage />
//                 </Fragment>
//               )}
//             />
//             <Route
//               exact
//               path="/lessons"
//               render={() => (
//                 <Fragment>
//                   <PageHeader
//                     icon="book"
//                     text="Get your book's lesson data below"
//                     color="blue"
//                   />
//                   <LessonsPage sendData={sendData} isGameReady={isGameReady} />
//                 </Fragment>
//               )}
//             />
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
//             <Route
//               render={() => (
//                 <Fragment>
//                   <PageHeader icon="exclamation" color="red" text="Report your errors" />
//                   <ErrorPage
//                     header="Sorry... that page doesn't exist."
//                     content={
//                       <p>
//                         Double check the URL or head
//                         {
//                           <Link
//                             to={{
//                               pathname: "/",
//                               state: { pageTransition: "slideUp" },
//                             }}
//                           >
//                             {" "}
//                             home
//                           </Link>
//                         }
//                         .
//                       </p>
//                     }
//                   />
//                 </Fragment>
//               )}
//             />
//           </Switch>
//           )} />
//         </CSSTransition>
//       </TransitionGroup>
//     </Fragment>
//   );
// };

// export default withRouter(Routers);
