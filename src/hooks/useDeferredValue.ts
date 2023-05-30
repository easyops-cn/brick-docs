import { useEffect, useState } from "react";

export default function useDeferredValue<T>(value: T, timeout = 200): T {
  const [deferredValue, setDeferredValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeferredValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);

  return deferredValue;
}
