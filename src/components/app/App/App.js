import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "store";
import SideBar from "../SideBar";
import DataModal from "../DataModal";
import PastLessonModal from "../PastLessonModal";
import Go2GamesScreen from "../Go2GamesScreen";
import Routes from "components/routes";
import "./App.css";

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

export default () => (
  <BrowserRouter>
    <StoreProvider>
      <SideBar />
      <DataModal />
      <PastLessonModal />
      <Go2GamesScreen />
      <Routes />
    </StoreProvider>
  </BrowserRouter>
);
