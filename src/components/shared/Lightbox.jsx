import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Lightbox.module.css";

export default function Lightbox({ images, trigger }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <>
      <button className={styles.trigger} onClick={() => { setOpen(true); setCurrent(0); }}>
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={styles.content}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.close} onClick={() => setOpen(false)}>
                &times;
              </button>

              <div className={styles.imageWrap}>
                <img
                  src={images[current].src}
                  alt={images[current].alt}
                  className={styles.image}
                />
              </div>

              {images[current].caption && (
                <p className={styles.caption}>{images[current].caption}</p>
              )}

              {images.length > 1 && (
                <div className={styles.nav}>
                  <button className={styles.arrow} onClick={prev}>&larr;</button>
                  <span className={styles.counter}>
                    {current + 1} / {images.length}
                  </span>
                  <button className={styles.arrow} onClick={next}>&rarr;</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
