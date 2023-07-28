import { useCallback, useEffect, useState } from "react";

const listeners = new Set<(lang: "html" | "yaml") => void>();

const STORAGE_KEY_LANGUAGE = "example.language";

export default function useExampleLanguage() {
  const [language, setLanguage] = useState<"html" | "yaml">();

  useEffect(() => {
    setLanguage(
      localStorage.getItem(STORAGE_KEY_LANGUAGE) === "html" ? "html" : "yaml"
    );
  }, []);

  useEffect(() => {
    const listener = (lang: "html" | "yaml") => {
      setLanguage(lang);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const changeLanguage = useCallback((lang: "html" | "yaml") => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
    for (const listener of listeners) {
      listener(lang);
    }
  }, []);

  return [language, changeLanguage] as const;
}
