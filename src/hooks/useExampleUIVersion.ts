import { useCallback, useEffect, useState } from "react";

type UI_VERSION = "8.2" | "8.0";

const listeners = new Set<(uiVersion: UI_VERSION) => void>();

const STORAGE_KEY_UI_VERSION = "example.ui.version";

export default function useExampleUIVersion() {
  const [uiVersion, setUIVersion] = useState<UI_VERSION>();

  useEffect(() => {
    setUIVersion(
      localStorage.getItem(STORAGE_KEY_UI_VERSION) === "8.0" ? "8.0" : "8.2"
    );
  }, []);

  useEffect(() => {
    const listener = (version: UI_VERSION) => {
      setUIVersion(version);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const changeUIVersion = useCallback((version: UI_VERSION) => {
    setUIVersion(version);
    localStorage.setItem(STORAGE_KEY_UI_VERSION, version);
    for (const listener of listeners) {
      listener(version);
    }
  }, []);

  return [uiVersion, changeUIVersion] as const;
}
