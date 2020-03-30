import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);
  function transition(state, replace = false) {
    if (!replace) {
      setHistory([ ...history, state ]);
    }
    setMode(state);
  }

  function back() {
    if (history.length > 1) {
      const oldHistory = history.splice(0, history.length - 1);
      setHistory(oldHistory);
      setMode(history[oldHistory.length - 2]);
      console.log(history);
    }
  }

  return { mode, transition, back };
}
