import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "../store";
import SideBar from "./navInfo/SideBar";
import DataModal from "./navInfo/DataModal";
import Routes from "./Routes";
import "./App.css";

export default function App() {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
  }, []);

  return (
    <BrowserRouter>
      <StoreProvider>
        <SideBar />
        <DataModal />
        <Routes />
      </StoreProvider>
    </BrowserRouter>
  );
}
