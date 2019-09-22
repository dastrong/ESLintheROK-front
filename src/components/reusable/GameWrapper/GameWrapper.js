import React, { cloneElement } from "react";
import InfoModal from "./InfoModal";
import { useStore } from "store";

export default function WithStoreAndInfo({ children, gameInfo, path }) {
  const { keyCuts, info } = gameInfo;
  const { attachments, attachURL, title, images } = info;

  const [store, dispatch] = useStore();
  const {
    vocabulary,
    expressions,
    isGameReady,
    font,
    colors,
    showSideBar,
    showDataModal,
  } = store;

  const childProps = path.includes("/play")
    ? {
        title,
        font,
        vocabulary,
        expressions,
        colors,
        isMenuOpen: showSideBar || showDataModal,
      }
    : { title, font, isGameReady, path, image: images.topText };

  const child = cloneElement(children, childProps);

  return (
    <>
      <InfoModal
        font={font}
        dispatch={dispatch}
        keyCuts={keyCuts}
        opacity={path.includes("/play") ? 0 : 1}
        path={path}
        title={title}
        attachments={attachments}
        attachURL={attachURL}
      />
      {child}
    </>
  );
}
