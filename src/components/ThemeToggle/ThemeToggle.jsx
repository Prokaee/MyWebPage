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
    setExpanding(true);

    const dot = dotRef.current;
    const rect = dot.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const r = maxDist + 50;

    const overlay = overlayRef.current;

    if (!light) {
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
  }, [light, expanding]);

  return (
    <>
      <button
        ref={dotRef}
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
    </>
  );
}
