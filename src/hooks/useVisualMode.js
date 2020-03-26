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
    const oldHistory = history.splice(0, history.length - 1);
    if (history.length > 1) {
      setMode(history[oldHistory.length - 1]);
      setHistory(oldHistory);
    }
  }

  return { mode, transition, back };
}
