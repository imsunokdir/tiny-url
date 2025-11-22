import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    const saved = sessionStorage.getItem("scroll:" + pathname);

    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Number(saved));
      });
    }

    return () => {
      sessionStorage.setItem("scroll:" + pathname, String(window.scrollY));
    };
  }, [pathname]);
}
