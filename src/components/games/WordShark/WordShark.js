import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import useData from "hooks/useData";
import useFitText from "hooks/useFitText";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import {
  verifyGameData,
} from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./WordShark.css";

// DELETE LATER - WILL BE ADDED USING CLOUDINARY
import background from './images/word-shark_background.jpg';
import img0 from './images/0.svg';
import img1 from './images/1.svg';
import img2 from './images/2.svg';
import img3 from './images/3.svg';
import img4 from './images/4.svg';
import img5 from './images/5.svg';
import img6 from './images/6.svg';
import img7 from './images/7.svg';
import img8 from './images/8.svg';

const maxWrong = 8;
const images = [img0, img1, img2, img3, img4, img5, img6, img7, img8];
const letters = "abcdefghijklmnopqrstuvwxyz";

const init = data => ({
    data: shuffle(data),
    isVocab: true,
    answer: "",
    guessed: new Set(),
    nWrong: 0,
});

function reducer(state, action) {
    const { type, data, guessed, answer, nWrong, letter } = action;
  switch (type) {
    case "Set_Data":
        return { ...state, data: shuffle(data) };
    case 'Handle_Guess':
        // dnt change mutable data types directly
        const newSet = new Set(guessed.add(letter));
        return {
            ...state,
            guessed: newSet,
            nWrong: nWrong + (answer.includes(letter) ? 0 : 1)
        };
    case "New_Round":
        return { ...state, data, answer, guessed: new Set(), nWrong: 0 };
    default:
      return state;
  }
}

export default function WordShark(props) {
    const { title, font, vocabulary } = props;
    useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

    const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
    const { data, isVocab, answer, guessed, nWrong } = state;

    const handleGame = useCallback(() => {
        googleEvent(title);
        const [cur, nex] = verifyGameData(data, isVocab, vocabulary);
        dispatch({ type: "New_Round", data: nex, answer: cur });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isVocab, dispatch]);
    
    useHandleGame(handleGame, didUpdate);

    const [[ref]] = useFitText(1, answer, font);

    const gameOver = nWrong >= maxWrong;
    const isWinner = _guessedWord().join('') === answer;
    const altText = ` ${nWrong} wrong guess${nWrong !== 1 ? 'es' : ''
        }, ${maxWrong - nWrong} guess${maxWrong - nWrong !== 1 ? 'es' : ''} left`;
    const loseMsg = `You lose! The correct word is: ${answer}`;
    const winMsg = 'You win!';
    let gameState = (
        <div className="AlphaButtons">{_generateButtons(letters)}</div>
    );
    if (isWinner)
        gameState = (
            <div className="Hangman-msg-win">
                <span>{winMsg}</span>
            </div>
        );
    if (gameOver)
        gameState = (
            <div className="Hangman-msg-lose">
                <span>{loseMsg}</span>
            </div>
        );


    function _generateButtons(alphabet) {
        return alphabet.split('').map(letter => (
            <button
                key={letter}
                value={letter}
                onClick={() =>
                    dispatch({ type: 'Handle_Guess', letter, guessed, nWrong, answer })
                }
                disabled={guessed.has(letter)}
                className="ltrBtn"
            >
                {letter}
            </button>
        ));
    }

    function _guessedWord() {
        return answer.split('').map(letter => (guessed.has(letter) ? letter : '_'));
    }

    function _handleNewRound() {
        if (data.length === vocabulary.length - 1) {
            googleEvent(title);
        }
        handleGame();
    }

    return (
      <div
          className="Hangman"
          style={{
              fontFamily: font
          }}
      >
          <div className="Hangman-imgContainer">
              <div className="Hangman-imgs">
                  <img
                      className="Hangman-WordSharkBackgroundImg"
                      src={background}
                      alt="background for Word Shark, showing stickman and shark"
                  />
                  <img
                      className="Hangman-WordSharkOverlayImgs"
                      src={images[nWrong]}
                      alt={altText}
                  />
              </div>
          </div>
          <div className="Hangman-guessContainer">
              <p className="Hangman-guessesLeft">{`${maxWrong - nWrong} guess${nWrong === maxWrong - 1 ? '' : 'es'} left`}</p>
              <p className="Hangman-word-holder">
                  <FitText text={_guessedWord()} ref={ref} cx="Hangman-word" />
              </p>
          </div>
          <div className="letter-buttons">
                {gameState}
                <button
                    className="Hangman-restartBtn"
                    onClick={_handleNewRound}
                >
                  New Round
               </button>
          </div>
      </div>
  );
}
