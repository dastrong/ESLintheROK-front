import React from 'react';
import Link from 'next/link';
import { FaFolderOpen } from 'react-icons/fa';
import { useStore } from '../contexts/store';

export default function IndexPage() {
  const { storeDispatch } = useStore();

  function openModal(dataModalName: 'lessons' | 'data') {
    storeDispatch({ type: 'openDataModal', dataModalName });
  }

  return (
    <div className="mainpage-container">
      <img
        className="ying-yang"
        useMap="#flag-map"
        src="https://res.cloudinary.com/dastrong/image/upload/v1535538943/TeacherSite/Flag_Icon.svg"
        alt="korea-flag"
      />
      <map name="flag-map">
        <area
          role="button"
          alt="red-ying"
          tabIndex={0}
          onKeyDown={() => openModal('lessons')}
          onClick={() => openModal('lessons')}
          shape="poly"
          coords="105,26,135,12,157,6,184,1,211,2,232,4,250,9,272,16,294,26,315,38,333,53,347,67,363,88,373,104,383,126,391,146,398,174,398,196,397,214,395,230,391,250,390,220,382,196,369,176,355,162,337,152,321,145,294,141,273,140,247,147,225,162,207,181,191,211,177,228,156,240,140,250,112,254,83,250,62,242,47,229,34,215,21,198,16,180,12,158,14,138,21,116,30,97,44,79,58,60,82,41"
        />
        <area
          role="button"
          tabIndex={0}
          alt="blue-yang"
          onKeyDown={() => openModal('data')}
          onClick={() => openModal('data')}
          shape="poly"
          coords="218,399,256,390,289,377,310,366,329,351,352,329,367,306,377,288,386,268,388,250,385,220,374,192,355,172,335,158,305,147,275,147,249,155,227,170,209,187,190,221,175,236,158,248,130,256,106,259,74,252,53,241,37,227,23,210,16,193,11,172,9,151,11,140,5,163,1,195,3,228,13,266,23,289,39,315,56,336,74,354,96,370,120,381,145,391,181,398"
        />
      </map>

      <Link href="/games">
        <a className="set st-set">
          <span className="text">GAMES</span>
          <div />
          <div className="line_middle" />
          <div />
        </a>
      </Link>

      <Link href="/contact">
        <a className="set nd-set">
          <span className="text">CONTACT</span>
          <div>
            <span className="line_white" />
          </div>
          <div className="line_middle" />
          <div>
            <span className="line_white" />
          </div>
        </a>
      </Link>

      <Link href="/faq">
        <a className="set rd-set">
          <span className="text">FAQ</span>
          <div />
          <div className="line_middle">
            <span className="line_white" />
          </div>
          <div />
        </a>
      </Link>

      <Link href="/about">
        <a className="set th-set">
          <span className="text">ABOUT</span>
          <div>
            <span className="line_white" />
          </div>
          <div className="line_middle">
            <span className="line_white" />
          </div>
          <div>
            <span className="line_white" />
          </div>
        </a>
      </Link>

      <button
        className="btn btn-past-lessons"
        onClick={() => console.log('click - open past lessons modal')}
      >
        <FaFolderOpen
          style={{
            position: 'absolute',
            left: '13px',
            fontSize: '1.3rem',
          }}
        />
        No Past Lessons
        {/* {!pastLessons.length && 'No '}Past Lessons */}
      </button>

      <a
        className="btn btn-coffee"
        target="_blank"
        href="https://www.buymeacoffee.com/ycqPbFl"
      >
        <img
          className="coffee-img"
          src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
          alt="Buy me a coffee"
        />
        Buy me a coffee
      </a>

      <style jsx>{`
        .mainpage-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        map {
          cursor: pointer;
        }

        .ying-yang {
          height: 400px;
          width: 400px;
        }

        .set {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 134px;
          width: 200px;
          position: absolute;
          transition: 0.25s transform;
          text-decoration: none;
        }

        .set.st-set {
          transform: translate(-318px, -183px) rotate(-56deg);
        }

        .set.nd-set {
          transform: translate(318px, -183px) rotate(56deg);
        }

        .set.rd-set {
          transform: translate(-318px, 183px) rotate(56deg);
        }

        .set.th-set {
          transform: translate(318px, 183px) rotate(-56deg);
        }

        .set div {
          width: 200px;
          height: 34px;
          background-color: black;
          position: relative;
        }

        .set div.line_middle {
          margin: 16px 0;
        }

        .set div span.line_white {
          width: 17px;
          height: 37px;
          background-color: white;
          transform: translateX(92px);
          position: absolute;
          top: -1px;
        }

        .set .text {
          height: 34px;
          line-height: 34px;
          font-size: 34px;
          font-weight: bold;
          color: white;
          text-shadow: 0 1px 17px black;
          transition-property: color, text-shadow, transform;
          transition-timing-function: ease;
          transition-duration: 0.5s;
          user-select: none;
          z-index: 1;
          position: absolute;
          top: 50px;
          width: 100%;
          text-align: center;
        }

        .set:hover div {
          opacity: 0.3;
        }

        .set:hover .text {
          color: black;
          text-shadow: 1px 1px 10px lightgrey;
        }

        .set.st-set:hover .text,
        .set.th-set:hover .text {
          transform: rotate(56deg) scale(1.35);
        }

        .set.nd-set:hover .text,
        .set.rd-set:hover .text {
          transform: rotate(-56deg) scale(1.35);
        }

        .btn {
          position: absolute;
          bottom: 10px;
          margin: 0;
          padding: 0.75rem 1.2rem 0.75rem 2.8rem;
          border-radius: 5px;
          color: #fff;
        }

        .btn:hover {
          box-shadow: inset 0 0 0 1px transparent,
            inset 0 0 0 0 rgb(34 36 38 / 15%);
        }

        .btn-past-lessons {
          left: 10px;
          background-color: #2185d0;
        }

        .btn-coffee {
          right: 10px;
          background-color: #fbbd08;
        }

        .coffee-img {
          position: absolute;
          left: 13px;
          height: auto;
          width: 24px;
        }
      `}</style>
    </div>
  );
}
