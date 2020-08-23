import { useState } from "react";

//Custom hook to help with user actions in index.js
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (next, replace) {
    //replace checks for error mode
    if (!replace) {
      setHistory([...history, next]);
    }
    return setMode(next)
  }

  function back () {
    //when cancel is clicked, check if there is history
    if (history.length > 1) {
      //if yes, remove the newest mode.
      let newHistory = history.slice(0, -1);
      setHistory(newHistory);
      return setMode(newHistory[newHistory.length - 1]);
    }
  }

  return { mode, transition, back };
}