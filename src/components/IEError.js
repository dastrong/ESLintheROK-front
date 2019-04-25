import React, { useState } from "react";
import classNames from "classnames";
import PageHeader from "./reusable/PageHeader";
import ca from "../assets/images/ca.svg";
import kr from "../assets/images/kr.svg";
import "./_StartUpError.css";

const text = {
  ca: [
    "It looks like you're using Internet Explorer (IE).",
    "ESL in the ROK is not optimized for IE.",
    "Please use a modern browser like Chrome, Firefox or Opera.",
    "If you are not using IE, please let me know through my Kakao Group Chat: ESL in the ROK",
    "Why don't I support IE?",
    "This site was created using newer technologies. IE does not support those technologies.",
    "Sorry for the inconvenience.",
  ],
  kr: [
    "당신은 지금 '인터넷 익스플로러'를 사용하고 있군요",
    "본 사이트는 인터넷 익스플로러에서는 사용할 수 없습니다",
    "크롬이나 파이어폭스나 오페라와 같은 최신 브라우저를 사용하기를 추천합니다",
    "인터넷 익스플로러를 사용하지 않음에도 불구하고, 경고 메세지가 뜬다면, 제 카카오 그룹 채팅방(ESL in the ROK)에 알려주세요",
    "제가 인터넷 익스플로러를 지원하지 않는 이유는?",
    "이 웹사이트는 최근에 계발된 프로그래밍 기술로 만들어졌기 때문입니다. 인터넷 익스플로러는 그런 기술들을 지원하지 않기 때문입니다.",
    "불편함을 드려 죄송합니다.",
  ],
};

export default function IEError() {
  const [language, setLanguage] = useState("ca");

  return (
    <>
      <PageHeader icon="internet explorer" text="Welco. . . nvm." />
      <div className="startUpError-container">
        <div className="startUpError-inner">
          <img
            alt="canadian flag"
            src={ca}
            className={classNames("flag-icon", { active: language === "ca" })}
            onClick={() => setLanguage("ca")}
          />
          <img
            alt="korean flag"
            src={kr}
            className={classNames("flag-icon", { active: language === "kr" })}
            onClick={() => setLanguage("kr")}
          />
          <h1>{text[language][0]}</h1>
          <h2>{text[language][1]}</h2>
          <h3>{text[language][2]}</h3>
          <p>{text[language][3]}</p>
          <hr />
          <h3>{text[language][4]}</h3>
          <p>{text[language][5]}</p>
          <br />
          <p>{text[language][6]}</p>
        </div>
      </div>
    </>
  );
}
