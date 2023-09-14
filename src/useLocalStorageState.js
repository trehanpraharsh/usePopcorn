import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, keyVal) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(keyVal);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(keyVal, JSON.stringify(value));
    },
    [value, keyVal]
  );

  return [value, setValue];
}
