/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { useStore } from 'contexts/store';
import { useUser } from 'contexts/user';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore, Position } from './state_types';
import * as Styles from './Notebook.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import { arrOfRandoNum, getRandoNum, nextRoundData } from 'games/_utils';
import FitText from 'components/FitText';

export default function Notebook({
  getHeaderTemplate,
  showBlank = false,
}: {
  getHeaderTemplate: (text: number) => string;
  showBlank?: boolean;
}) {
  const store = useStore();
  const { user } = useUser();
  const ContainerCSS = Styles.getContainerCSS(user.activeFont);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
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

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [[textRef, headerRef], updateFitText] = useFitText(2, true);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // googleEvent(title);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[cur], nex] = nextRoundData(1, data, fullData, true);
    const edited = changeText(cur, maxEdits, position, showBlank);
    const [editedText, indexesTargeted] = edited;
    const actualText = cur.split('');
    dispatch({
      type: 'New_Round',
      data: nex,
      actualText,
      editedText,
      indexesTargeted,
    });
  }, [data, isVocab, maxEdits, position]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });

      const keyClicked = key.toLowerCase();
      if (keyClicked === 'a')
        return dispatch({ type: 'Change_Position', position: 'any' });
      if (keyClicked === 's')
        return dispatch({ type: 'Change_Position', position: 'start' });
      if (keyClicked === 'm')
        return dispatch({ type: 'Change_Position', position: 'middle' });
      if (keyClicked === 'e')
        return dispatch({ type: 'Change_Position', position: 'end' });

      const keyNum = Number(key);
      if (!keyNum) return;
      dispatch({ type: 'Change_Max', maxEdits: keyNum });
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean) =>
      // can remove the following if there's only one data source
      dispatch({ type: 'Change_isVocab', isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
  }, [maxEdits, position]);

  // whenever we click a new target or reset the game, resize the text
  useEffect(() => {
    if (isFirstRun) return;
    updateFitText();
  }, [indexesShown]);

  const headerTemplate = getHeaderTemplate(editsLeft);
  const header = getHeader(headerTemplate, editsLeft, isVocab);
  const text = getNotebookText(editedText, actualText, indexesShown);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  const _handleHeaderClick =
    indexesTargeted.length !== indexesShown.length
      ? () => dispatch({ type: 'Show_Character' })
      : handleGame;

  return (
    <div className={ContainerCSS.className}>
      <div className={Styles.NotebookVertLineCSS.className} />

      <div
        className={Styles.NotebookHeadCSS.className}
        onClick={_handleHeaderClick}
      >
        <FitText
          text={header}
          ref={headerRef}
          cx={Styles.NotebookHeadFitTextCSS.className}
        />
      </div>

      <div className={Styles.NotebookBodyCSS.className}>
        <div className={Styles.NotebookSideCSS.className}>
          {indexesTargeted.map(target => {
            const shown = indexesShown.includes(target);
            return (
              <div
                key={`click-handler-${target}`}
                className={classNames(Styles.NotebookSideHoleCSS.className, {
                  [Styles.NotebookSideHoleActiveCSS.className]: shown,
                })}
                onClick={() => dispatch({ type: 'Show_Character', target })}
              />
            );
          })}
        </div>
        <div className={Styles.NotebookTextCSS.className}>
          <FitText ref={textRef} cx={Styles.NotebookTextFitTextCSS.className}>
            {text}
          </FitText>
        </div>
      </div>

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.NotebookHeadCSS.styles}
      {Styles.NotebookHeadFitTextCSS.styles}
      {Styles.NotebookBodyCSS.styles}
      {Styles.NotebookSideCSS.styles}
      {Styles.NotebookSideHoleCSS.styles}
      {Styles.NotebookSideHoleActiveCSS.styles}
      {Styles.NotebookTextCSS.styles}
      {Styles.NotebookTextFitTextCSS.styles}
      {Styles.NotebookVertLineCSS.styles}
    </div>
  );
}

// we only ever need to make letters smaller, so students know when to capitalize
const punctuationMarks = ['.', ',', '?', '!', "'", '-', ':', ';', ' '];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// OTHER FUNCTIONS HERE
// formats the text, so we can send it to our FitText component
function getNotebookText(
  editedText: string[],
  actualText: string[],
  indexesShown: number[]
): (string | JSX.Element)[] {
  return editedText.map((char, i) =>
    indexesShown.includes(i) ? (
      <span key={`character-${char}-${i}`} style={{ color: 'red' }}>
        {actualText[i]}
      </span>
    ) : (
      char
    )
  );
}

// gets the header component
function getHeader(
  template: string,
  editsLeft: number,
  isVocab: boolean
): string {
  return editsLeft ? template : `Get New ${isVocab ? 'Word' : 'Expression'}`;
}

// returns an array containing editedCharacters and the indexes of those edits
function changeText(
  text: string,
  maxCount: number,
  position: Position,
  showBlank: boolean
) {
  // split all the characters
  const splitText = text.split('');

  // if it's only one letter, return it unchanged
  if (text.length < 2) return [splitText, []];
  // if the string is all spaces skip it
  if (splitText.every(char => char === ' ')) return [splitText, []];
  // if the there's two letters, we know the paramaters needed for editing
  if (text.length === 2)
    return getEditedChars(splitText, 1, position, showBlank);

  // split the string into words and letters and get the set the length var
  const words = text.split(' ');

  // get how many edits we'll do and on which words we'll do them
  const editsPerWord = getEditNums(words, maxCount);

  // get all the edited words and location of edits
  const { editedChars, editedIndexes } = words.reduce(
    (acc, word, i) => {
      // split the word into single cha1racters
      const splitWord = word.split('');
      // get the edited version and edited indexes
      const [editedChar, editedIndexes] = getEditedChars(
        splitWord,
        editsPerWord[i],
        position,
        showBlank
      );

      // get the actual location in the string of the edited
      const actualIndexes = editedIndexes.map(
        idx => idx + acc.editedChars.length
      );
      acc.editedIndexes.push(...actualIndexes);
      // spread the edited word out
      acc.editedChars.push(...editedChar);
      if (i !== words.length - 1) {
        // and add a space unless it's the last word
        acc.editedChars.push(' ');
      }

      return acc;
    },
    { editedChars: [], editedIndexes: [] }
  );

  const sortedEditedIndexes = editedIndexes.sort((a, b) => a - b);

  return [editedChars, sortedEditedIndexes];
}

// returns an array of numOfEditsPerWord
function getEditNums(words: string[], maxCount: number) {
  // for every N characters, we can change 1 character
  const charForOneEdit = 4;
  // how many edits could we make on each word
  const numsOfPotentialEdits = words.map(word => {
    if (word.split('').every(char => char === '')) return 0;
    return Math.floor(word.length / charForOneEdit) || 1;
  });
  // total number of edits possible
  const totalPotentialEdits = numsOfPotentialEdits.reduce(
    (acc, cVal) => acc + cVal
  );
  // get the number of edits for current round
  const totalEdits =
    totalPotentialEdits > maxCount ? maxCount : totalPotentialEdits;
  // get an array of targets 'indexes'
  const targets = arrOfRandoNum(totalPotentialEdits - 1, 0, totalEdits, true);

  // needed to help determine which 'index' we're targeting
  let count = 0;
  // determines the number of edits for a each word in the given string
  const editsPerWord = numsOfPotentialEdits.map(potentEdits => {
    let numOfEdits: number;

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
function getRange(
  splitText: string[],
  count: number,
  position: Position
): [number, number] {
  // max and min used to randomly choose which character to change
  let range: [number, number];

  // get the range of indexes that we can look for in the word
  if (position === 'start') {
    range = [count - 1, 0];
  } else if (position === 'end') {
    range = [splitText.length - 1, splitText.length - count];
  } else if (position === 'middle' && splitText.length > 3) {
    range = [splitText.length - 2, 1];
  } else {
    range = [splitText.length - 1, 0];
  }

  return range;
}

// returns an edited array of characters and the indexes of the characters changed
function getEditedChars(
  textArr: string[],
  count: number,
  position: Position,
  showBlank: boolean
): [string[], number[]] {
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

    // get the proper replacer array
    const replacers = getReplacers(showBlank, targetCharacter);

    // get a replacement character and replace the target
    const replacement = getReplacement(replacers, targetCharacter);
    textArr[targetIdx] = replacement;
  }

  return [textArr, targetTextIndexes];
}

// check if the target is punctuation or a number and change the replacers array if so
function getReplacers(showBlank: boolean, targetCharacter: string): string[] {
  if (showBlank) return ['_'];
  return punctuationMarks.includes(targetCharacter)
    ? punctuationMarks
    : numbers.includes(targetCharacter)
    ? numbers
    : alphabet;
}

function getReplacement(replacers: string[], character: string): string {
  let replacement = character;
  while (replacement === character) {
    const replacementIdx = getRandoNum(replacers.length - 1);
    replacement = replacers[replacementIdx];
  }
  return replacement;
}
