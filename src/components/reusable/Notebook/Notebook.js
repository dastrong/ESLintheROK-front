import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import {
  arrOfRandoNum,
  changeIsVocab,
  getRandoNum,
  verifyGameData,
} from "helpers/gameUtils";
import NotebookHead from "./NotebookHead";
import NotebookBody from "./NotebookBody";
import NotebookVertLine from "./NotebookVertLine";
import "./Notebook.css";

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  editedText: [""],
  actualText: [""],
  maxEdits: 1,
  indexesTargeted: [],
  indexesShown: [],
  position: "any",
});

function reducer(state, action) {
  const {
    type,
    data,
    isVocab,
    actualText,
    editedText,
    maxEdits,
    indexesTargeted,
    target,
    position,
  } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return {
        ...state,
        data,
        actualText,
        editedText,
        indexesTargeted,
        indexesShown: [],
      };
    case "Change_Max":
      return { ...state, maxEdits };
    case "Change_Position":
      return { ...state, position };
    case "Show_Character":
      // when user clicks a hole-punch div
      if (target !== undefined) {
        return { ...state, indexesShown: [...state.indexesShown, target] };
      }
      // all edited shown; return state
      if (state.indexesTargeted.length === state.indexesShown.length) return state;
      // get the next target and show it
      const next = state.indexesTargeted.find(
        targetIdx => !state.indexesShown.includes(targetIdx)
      );
      return { ...state, indexesShown: [...state.indexesShown, next] };
    default:
      return state;
  }
}

export default function Notebook(props) {
  const {
    title,
    isMenuOpen,
    font,
    vocabulary,
    expressions,
    getHeaderTemplate,
    showBlank,
  } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const {
    data,
    isVocab,
    editedText,
    actualText,
    maxEdits,
    indexesTargeted,
    indexesShown,
    position,
  } = state;
  const editsLeft = indexesTargeted.length - indexesShown.length;
  const [[textRef]] = useFitText(1, indexesShown, font);
  const [[headerRef]] = useFitText(1, editsLeft, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    googleEvent(title);
    const [cur, nex] = verifyGameData(data, isVocab, vocabulary, expressions);
    const edited = changeText(cur, maxEdits, position, showBlank);
    const [editedText, indexesTargeted] = edited;
    const actualText = cur.split("");
    dispatch({
      type: "New_Round",
      data: nex,
      actualText,
      editedText,
      indexesTargeted,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, maxEdits, position]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
      if (keyCode === 65) return dispatch({ type: "Change_Position", position: "any" });
      if (keyCode === 83) return dispatch({ type: "Change_Position", position: "start" });
      if (keyCode === 77)
        return dispatch({ type: "Change_Position", position: "middle" });
      if (keyCode === 69) return dispatch({ type: "Change_Position", position: "end" });
      if (code.includes("Digit")) {
        const keyNum = Number(key);
        if (!keyNum) return;
        dispatch({ type: "Change_Max", maxEdits: keyNum });
      }
    },
    [dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => dispatch({ type: "Change_isVocab", isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxEdits, position]);

  const headerTemplate = getHeaderTemplate(editsLeft);
  const header = getHeader(headerTemplate, editsLeft, isVocab);
  const text = getNotebookText(editedText, actualText, indexesShown);

  const _handleHeaderClick =
    indexesTargeted.length !== indexesShown.length
      ? () => dispatch({ type: "Show_Character" })
      : handleGame;

  return (
    <div className="notebook" style={{ fontFamily: font }}>
      <NotebookHead text={header} ref={headerRef} handleClick={_handleHeaderClick} />
      <NotebookBody
        text={text}
        ref={textRef}
        dispatch={dispatch}
        indexesTargeted={indexesTargeted}
        indexesShown={indexesShown}
      />
      <NotebookVertLine />
    </div>
  );
}

// we only ever need to make letters smaller, so students know when to capitalize
const punctuationMarks = [".", ",", "?", "!", "'", "-", ":", ";", " "];
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// OTHER FUNCTIONS HERE
// formats the text, so we can send it to our FitText component
function getNotebookText(editedText, actualText, indexesShown) {
  return editedText.map((char, i) =>
    indexesShown.includes(i) ? (
      <span key={`character-${char}-${i}`}>{actualText[i]}</span>
    ) : (
      char
    )
  );
}

// gets the header component
function getHeader(template, editsLeft, isVocab) {
  return editsLeft ? template : `Get New ${isVocab ? "Word" : "Expression"}`;
}

// returns an array containing editedCharacters and the indexes of those edits
function changeText(text, maxCount, position, showBlank) {
  // split all the characters
  const splitText = text.split("");

  // if it's only one letter, return it unchanged
  if (text.length < 2) return [splitText, []];
  // if the string is all spaces skip it
  if (splitText.every(char => char === " ")) return [splitText, []];
  // if the there's two letters, we know the paramaters needed for editing
  if (text.length === 2) return getEditedChars(splitText, 1, position, showBlank);

  // split the string into words and letters and get the set the length var
  const words = text.split(" ");

  // get how many edits we'll do and on which words we'll do them
  const editsPerWord = getEditNums(words, maxCount);

  // get all the edited words and location of edits
  const { editedChars, editedIndexes } = words.reduce(
    (acc, word, i) => {
      // split the word into single cha1racters
      const splitWord = word.split("");
      // get the edited version and edited indexes
      const [editedChar, editedIndexes] = getEditedChars(
        splitWord,
        editsPerWord[i],
        position,
        showBlank
      );

      // get the actual location in the string of the edited
      const actualIndexes = editedIndexes.map(idx => idx + acc.editedChars.length);
      acc.editedIndexes.push(...actualIndexes);
      // spread the edited word out
      acc.editedChars.push(...editedChar);
      if (i !== words.length - 1) {
        // and add a space unless it's the last word
        acc.editedChars.push(" ");
      }

      return acc;
    },
    { editedChars: [], editedIndexes: [] }
  );

  const sortedEditedIndexes = editedIndexes.sort((a, b) => a - b);

  return [editedChars, sortedEditedIndexes];
}

// returns an array of numOfEditsPerWord
function getEditNums(words, maxCount) {
  // for every N characters, we can change 1 character
  const charForOneEdit = 4;
  // how many edits could we make on each word
  const numsOfPotentialEdits = words.map(word => {
    if (word.split("").every(char => char === "")) return 0;
    return Math.floor(word.length / charForOneEdit) || 1;
  });
  // total number of edits possible
  const totalPotentialEdits = numsOfPotentialEdits.reduce((acc, cVal) => acc + cVal);
  // get the number of edits for current round
  const totalEdits = totalPotentialEdits > maxCount ? maxCount : totalPotentialEdits;
  // get an array of targets 'indexes'
  const targets = arrOfRandoNum(totalPotentialEdits - 1, 0, totalEdits, true);

  // needed to help determine which 'index' we're targeting
  let count = 0;
  // determines the number of edits for a each word in the given string
  const editsPerWord = numsOfPotentialEdits.map(potentEdits => {
    let numOfEdits;

    // figures out how many edits are needed for a word
    if (potentEdits === 1) {
      // check if this word is being targeted
      numOfEdits = targets.includes(count) ? 1 : 0;
    } else {
      // for larger words we need to check those extra 'indexes' to get the total num of edits
      numOfEdits = Array.from(Array(potentEdits), (_, i) => count + i).reduce(
        (acc, cVal) => acc + (targets.includes(cVal) ? 1 : 0),
        0
      );
    }

    // increment our count variable to keep track of 'indexes'
    count += potentEdits;

    return numOfEdits;
  });

  return editsPerWord;
}

// determines which indexes we should aim to edit
function getRange(splitText, count, position) {
  // max and min used to randomly choose which character to change
  let range;

  // get the range of indexes that we can look for in the word
  if (position === "start") {
    range = [count - 1, 0];
  } else if (position === "end") {
    range = [splitText.length - 1, splitText.length - count];
  } else if (position === "middle" && splitText.length > 3) {
    range = [splitText.length - 2, 1];
  } else {
    range = [splitText.length - 1, 0];
  }

  return range;
}

// returns an edited array of characters and the indexes of the characters changed
function getEditedChars(textArr, count, position, showBlank) {
  // if we don't need any skip it
  if (count === 0) return [textArr, []];

  // where should we aim to edit the word
  const [max, min] = getRange(textArr, count, position);

  // gets the target index and character
  const targetTextIndexes = arrOfRandoNum(max, min, count, true);

  // change the characters for each target index
  for (let i = 0; i < targetTextIndexes.length; i++) {
    const targetIdx = targetTextIndexes[i];
    // get the targeted character
    const targetCharacter = textArr[targetIdx];

    // check if the target is punctuation and change the replacers array if true
    const isPunctuation = punctuationMarks.includes(targetCharacter);
    let replacers = showBlank ? ["_"] : isPunctuation ? punctuationMarks : alphabet;

    // get a replacement character and replace the target
    const replacer = getReplacer(replacers, targetCharacter);
    textArr[targetIdx] = replacer;
  }

  return [textArr, targetTextIndexes];
}

function getReplacer(replacers, character) {
  let replacer = character;
  while (replacer === character) {
    const replacerIdx = getRandoNum(replacers.length - 1);
    replacer = replacers[replacerIdx];
  }
  return replacer;
}
