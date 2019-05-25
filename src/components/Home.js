import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useStore } from "../store";
import "./Home.css";

export default function Home() {
  useDocumentTitle("Home - ESL in the ROK");
  const [{ pastLessons }, dispatch] = useStore();

  return (
    <div className="mainpage-container">
      <img
        id="ying-yang"
        useMap="#flag-map"
        src="https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,w_400/v1535538943/TeacherSite/Flag_Icon.svg"
        alt="korea-flag"
      />

      <map name="flag-map">
        <area
          alt="red-ying"
          name="lessons"
          onClick={() => dispatch({ type: "openDataModal", name: "lessons" })}
          shape="poly"
          coords="105,26,135,12,157,6,184,1,211,2,232,4,250,9,272,16,294,26,315,38,333,53,347,67,363,88,373,104,383,126,391,146,398,174,398,196,397,214,395,230,391,250,390,220,382,196,369,176,355,162,337,152,321,145,294,141,273,140,247,147,225,162,207,181,191,211,177,228,156,240,140,250,112,254,83,250,62,242,47,229,34,215,21,198,16,180,12,158,14,138,21,116,30,97,44,79,58,60,82,41"
        />
        <area
          alt="blue-yang"
          name="data"
          onClick={() => dispatch({ type: "openDataModal", name: "data" })}
          shape="poly"
          coords="218,399,256,390,289,377,310,366,329,351,352,329,367,306,377,288,386,268,388,250,385,220,374,192,355,172,335,158,305,147,275,147,249,155,227,170,209,187,190,221,175,236,158,248,130,256,106,259,74,252,53,241,37,227,23,210,16,193,11,172,9,151,11,140,5,163,1,195,3,228,13,266,23,289,39,315,56,336,74,354,96,370,120,381,145,391,181,398"
        />
      </map>

      <Link
        to={{
          pathname: "/games",
          state: { pageTransition: "slideUp" },
        }}
        className="set st-set"
      >
        <span className="text-row st-text-row">GAMES</span>
        <div className="row st-row" />
        <div className="row nd-row" />
        <div className="row rd-row" />
      </Link>

      <Link
        to={{
          pathname: "/contact",
          state: { pageTransition: "slideUp" },
        }}
        className="set nd-set"
      >
        <span className="text-row nd-text-row">CONTACT</span>
        <div className="row st-row">
          <span className="split-row" />
        </div>
        <div className="row nd-row" />
        <div className="row rd-row">
          <span className="split-row" />
        </div>
      </Link>

      <Link
        to={{
          pathname: "/faq",
          state: { pageTransition: "slideUp" },
        }}
        className="set rd-set"
      >
        <span className="text-row rd-text-row">FAQ</span>
        <div className="row st-row" />
        <div className="row nd-row">
          <span className="split-row" />
        </div>
        <div className="row rd-row" />
      </Link>

      <Link
        to={{
          pathname: "/about",
          state: { pageTransition: "slideUp" },
        }}
        className="set th-set"
      >
        <span className="text-row th-text-row">ABOUT</span>
        <div className="row st-row">
          <span className="split-row" />
        </div>
        <div className="row nd-row">
          <span className="split-row" />
        </div>
        <div className="row rd-row">
          <span className="split-row" />
        </div>
      </Link>

      <Button
        color="purple"
        size="large"
        disabled={!pastLessons.length}
        onClick={() => dispatch({ type: "togglePastLessons", bool: true })}
      >
        <Icon name="folder open" />
        {!pastLessons.length && "No "}Past Lessons
      </Button>

      <Button
        as="a"
        size="large"
        color="yellow"
        target="_blank"
        href="https://www.buymeacoffee.com/ycqPbFl"
      >
        <img
          src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
          alt="Buy me a coffee"
        />
        Buy me a coffee
      </Button>
    </div>
  );
}
