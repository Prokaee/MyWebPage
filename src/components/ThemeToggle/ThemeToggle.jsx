import { useState, useRef, useCallback } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const dotRef = useRef(null);
  const overlayRef = useRef(null);

  const toggle = useCallback(() => {
    if (expanding) return;
    setExpanding(true);

    const dot = dotRef.current;
    const rect = dot.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const overlay = overlayRef.current;
    overlay.style.setProperty("--cx", `${x}px`);
    overlay.style.setProperty("--cy", `${y}px`);
    overlay.style.setProperty("--r", `${maxDist + 50}px`);

    // Expanding overlay is always the color we're going TO
    overlay.style.background = light ? "#0a0a0a" : "#f0f0f0";
    overlay.classList.add(styles.expanding);

    overlay.addEventListener("animationend", () => {
      // Swap the theme while overlay covers everything
      if (light) {
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
      }

      // Now collapse the overlay to reveal the new theme
      overlay.classList.remove(styles.expanding);
      overlay.style.background = light ? "#0a0a0a" : "#f0f0f0";
      overlay.classList.add(styles.collapsing);

      overlay.addEventListener("animationend", () => {
        overlay.classList.remove(styles.collapsing);
        overlay.style.background = "transparent";
        setLight(!light);
        setExpanding(false);
      }, { once: true });
    }, { once: true });
  }, [light, expanding]);

  return (
    <>
      <button
        ref={dotRef}
        className={`${styles.dot} ${light ? styles.dotLight : ""}`}
        onClick={toggle}
        aria-label="Theme wechseln"
        title="Klick mich :)"
      >
        <span className={styles.glow} />
      </button>
      <div ref={overlayRef} className={styles.overlay} />
    </>
  );
}
