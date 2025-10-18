//this method is used for optimizing the performance of the search process
//it reduce the number of requests to the server by setting a timeout and resetting it while typing and in the end of typing it will make the request to the server
import { useState, useEffect } from "react";
export function useDebounce<T>(value: T, delay: number = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
