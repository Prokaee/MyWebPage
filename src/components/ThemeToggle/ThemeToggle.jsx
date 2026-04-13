<<<<<<< HEAD
import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ThemeToggle.module.css";

const MAGNETIC_RADIUS = 80;
const MAGNETIC_STRENGTH = 0.35;

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const dotRef = useRef(null);
  const overlayRef = useRef(null);

  // Magnetic effect
  useEffect(() => {
    const onMouseMove = (e) => {
      const dot = dotRef.current;
      if (!dot) return;

      const rect = dot.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAGNETIC_RADIUS) {
        const pull = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
        dot.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      } else {
        dot.style.transform = "translate(0, 0)";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Hint timing
  useEffect(() => {
    const t1 = setTimeout(() => setHintVisible(true), 2000);
    const t2 = setTimeout(() => setHintVisible(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const toggle = useCallback(() => {
    if (expanding) return;
    setHintDismissed(true);
=======
import { useState, useRef, useCallback } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const dotRef = useRef(null);
  const overlayRef = useRef(null);

  const toggle = useCallback(() => {
    if (expanding) return;
>>>>>>> d7ce27dccda724efd7968a45728b6ab3d48cd4d8
    setExpanding(true);

    const dot = dotRef.current;
    const rect = dot.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
<<<<<<< HEAD
    const r = maxDist + 50;

    const overlay = overlayRef.current;

    if (!light) {
      // Expand invert overlay
      overlay.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${r}px at ${x}px ${y}px)` },
        ],
        { duration: 700, easing: "ease-in-out", fill: "forwards" }
      ).onfinish = () => {
        document.documentElement.classList.add("inverted");
        setLight(true);
        setExpanding(false);
      };
    } else {
      // Collapse invert overlay
      overlay.animate(
        [
          { clipPath: `circle(${r}px at ${x}px ${y}px)` },
          { clipPath: `circle(0px at ${x}px ${y}px)` },
        ],
        { duration: 700, easing: "ease-in-out", fill: "forwards" }
      ).onfinish = () => {
        document.documentElement.classList.remove("inverted");
        setLight(false);
        setExpanding(false);
      };
    }
=======

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
>>>>>>> d7ce27dccda724efd7968a45728b6ab3d48cd4d8
  }, [light, expanding]);

  return (
    <>
      <button
        ref={dotRef}
<<<<<<< HEAD
        className={styles.dot}
        onClick={toggle}
        aria-label="Theme wechseln"
      >
        {(hintVisible && !hintDismissed) && (
          <div className={styles.hint}>
            <div>click here for light mode :)</div>
            <div className={styles.hintArrow}>↓</div>
          </div>
        )}
      </button>
      {createPortal(
        <div ref={overlayRef} className={styles.overlay} />,
        document.body
      )}
=======
        className={`${styles.dot} ${light ? styles.dotLight : ""}`}
        onClick={toggle}
        aria-label="Theme wechseln"
        title="Klick mich :)"
      >
        <span className={styles.glow} />
      </button>
      <div ref={overlayRef} className={styles.overlay} />
>>>>>>> d7ce27dccda724efd7968a45728b6ab3d48cd4d8
    </>
  );
}
