import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode);
    } else {
      history.push(mode);
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    }

  }

  return { mode, transition, back };
}