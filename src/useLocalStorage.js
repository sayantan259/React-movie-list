import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : initialState;
  }); // State for storing watched movies, initialized from localStorage

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
}
