import { useEffect } from "react";

export default function useHandleGame(handleGame, didUpdate) {
  // call the handleGame function after the useReducer
  // from the game has set the initial data as shuffled
  useEffect(() => {
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // didUpdate comes from useData
  // if data was edited, reset the game using that new data
  useEffect(() => {
    if (!didUpdate) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didUpdate]);
}
