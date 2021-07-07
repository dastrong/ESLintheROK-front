import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useAudio from "hooks/useAudio";
import useFitText from "hooks/useFitText";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import {
  verifyGameData,
  debounce,
} from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./WordShark.css";

// DELETE LATER - WILL BE ADDED USING CLOUDINARY
import backgroundImg from './images/Word_Shark_Background.jpg';
import img0 from './images/img0.svg';
import img1 from './images/img1.svg';
import img2 from './images/img2.svg';
import img3 from './images/img3.svg';
import img4 from './images/img4.svg';
import img5 from './images/img5.svg';
import img6 from './images/img6.svg';
import img7 from './images/img7.svg';
import img8 from './images/img8.svg';
import jawsUrl from './audio/jaws.mp3'; // https://orangefreesounds.com/jaws-theme-song/
import splashUrl from './audio/splash.mp3'; // "Splash, Small, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org

// CONSTANT VARIABLES
const maxWrong = 8;
const images = [img0, img1, img2, img3, img4, img5, img6, img7, img8];
const letters = "abcdefghijklmnopqrstuvwxyz";

// const getMediaURL = (type, file, transforms = "") =>
//   `https://res.cloudinary.com/dastrong/${type}/upload${transforms}/TeacherSite/Media/SpeedSolver/${file}`;
// // IMAGES URLs
// const backgroundImg = getMediaURL("image", "Word_Shark_Background.jpg", "/f_auto");
// const img0 = getMediaURL("image", "img0.svg", "/f_auto");
// const img1 = getMediaURL("image", "img1.svg", "/f_auto");
// const img2 = getMediaURL("image", "img2.svg", "/f_auto");
// const img3 = getMediaURL("image", "img3.svg", "/f_auto");
// const img4 = getMediaURL("image", "img4.svg", "/f_auto");
// const img5 = getMediaURL("image", "img5.svg", "/f_auto");
// const img6 = getMediaURL("image", "img6.svg", "/f_auto");
// const img7 = getMediaURL("image", "img7.svg", "/f_auto");
// const img8 = getMediaURL("image", "img8.svg", "/f_auto");

// AUDIO URLs
// const jawsUrl = getMediaURL("video", "jaws.mp3"); // https://orangefreesounds.com/jaws-theme-song/
// const splashUrl = getMediaURL("video", "splash.mp3"); // "Splash, Small, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org


// starting state
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
    const { title, font, vocabulary, isMenuOpen } = props;
    useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
    
    // AUDIO REFS
    const [jawsAud, resetJaws] = useAudio(jawsUrl);
    const [splashAud, resetSplash] = useAudio(splashUrl);

    // array of the above audios 
    const audios = [
        { track: jawsAud, reset: resetJaws },
        { track: splashAud, reset: resetSplash },
    ];

    // STATE
    const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
    const { data, isVocab, answer, guessed, nWrong } = state;
    const [[ref]] = useFitText(1, answer, font);

    // HANDLE GAME
    const handleGame = useCallback(() => {
        if (data.length === vocabulary.length - 1) {
            googleEvent(title);
        }
        const [cur, nex] = verifyGameData(data, isVocab, vocabulary);
        dispatch({ type: "New_Round", data: nex, answer: cur });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isVocab, dispatch]);
    useHandleGame(handleGame, didUpdate);

    // GAME SPECIFIC KEY EVENTS
    const keysCB = useCallback(
        debounce(({ key }) => {
            const letter = key.toLowerCase();
            if (letters.includes(letter) && (!guessed.has(letter)) && (gameState.props.className === 'AlphaButtons')) {
                return dispatch({ type: 'Handle_Guess', letter, guessed, nWrong, answer });
            }
        }, 250),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch, answer, guessed, nWrong, gameOver]
    );
    useKeys(isMenuOpen, handleGame, keysCB);

    // handles what audio plays
    useEffect(() => {
        // we're gonna reset all audios whenever nWrong changes
        const resetAudios = audios.map((audio) => audio.reset);
        __resetSounds(resetAudios);
        if (nWrong === maxWrong) {
            splashAud.current.play();
        } else if ((nWrong !== 0) && (nWrong !== maxWrong)) {
            jawsAud.current.play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nWrong]);

    // GAME VARIABLES
    const gameOver = nWrong >= maxWrong;
    const isWinner = _guessedWord().join('') === answer;
    const altText = `${nWrong} wrong guess${nWrong !== 1 ? 'es' : ''
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

    // GAME FUNCTIONS HERE
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

    // prevent handleGame being called twice if New Round button is in focus and 'space' or 'enter' is pressed
    function _handleNewRoundKeyDown(e) {
        e.preventDefault();
    }
 
    return (
      <div className="Hangman" style={{ fontFamily: font }} >
          <div className="Hangman-imgContainer">
              <div className="Hangman-imgs">
                  <img
                      className="Hangman-WordSharkBackgroundImg"
                      src={backgroundImg}
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
            <p className="Hangman-guessesLeft">
                {`${maxWrong - nWrong} guess${nWrong === maxWrong - 1 ? '' : 'es'} left`}</p>
            <p className="Hangman-word-holder">
                <FitText text={_guessedWord()} ref={ref} cx="Hangman-word" />
            </p>
          </div>
          <div className="letter-buttons">
            {gameState}
                <button
                    className="Hangman-restartBtn"
                    onClick={handleGame}
                    onKeyDown={(e) => _handleNewRoundKeyDown(e)}
                >
                  New Round
                </button>
          </div>
      </div>
  );
}

// OTHER FUNCTIONS 
function __resetSounds(cbs) {
    cbs.forEach((cb) => cb());
}
