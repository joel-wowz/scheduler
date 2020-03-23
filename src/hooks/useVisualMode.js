import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);
  function transition(state, replace = false) {
    if (!replace) {
      history.push(mode);
    }
    setMode(state);
  }
  function back(value) {
    if (history.length !== 0) {
      setMode(history.pop());
    }
  }
  return { mode, transition, back };
}
