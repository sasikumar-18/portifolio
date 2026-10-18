import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        /* storage can be unavailable (private mode) */
      }
      return next;
    });
  }, []);

  return { dark, toggle };
}
