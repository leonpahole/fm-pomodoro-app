import React, { useCallback, useRef, useState } from "react";

export const useStateAndRef = <T>(
  value: T
): [T, React.MutableRefObject<T>, (v: T) => void] => {
  const [state, setState] = useState<T>(value);
  const stateRef = useRef<T>(value);

  const setValue = useCallback((val: T) => {
    setState(val);
    stateRef.current = val;
  }, []);

  return [state, stateRef, setValue];
};
