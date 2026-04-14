import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { timeline } from "../../data/timeline";
import styles from "./Timeline.module.css";

export default function Timeline() {
  const [openImage, setOpenImage] = useState(null);

  return (
    <section id="timeline" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={4} title="Werdegang" />
        </FadeIn>

        <div className={styles.entries}>
          {timeline.map((entry, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className={styles.entry}>
                <div className={styles.left}>
                  <span className={styles.period}>{entry.period}</span>
                  <span className={styles.type}>{entry.type}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.dot} />
                </div>
                <div className={styles.right}>
                  <h3 className={styles.title}>{entry.title}</h3>
                  <span className={styles.institution}>
                    {entry.institution}
                  </span>
                  {entry.description && (
                    <p className={styles.description}>{entry.description}</p>
                  )}
                  {entry.images && (
                    <>
                      <button
                        className={styles.peek}
                        onClick={() => setOpenImage(openImage === i ? null : i)}
                      >
                        {openImage === i ? "Zuklappen" : "Mal anschauen"} {openImage === i ? "\u2191" : "\u2193"}
                      </button>
                      <AnimatePresence>
                        {openImage === i && (
                          <motion.div
                            className={styles.preview}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={entry.images[0].src}
                              alt={entry.images[0].alt}
                              className={styles.previewImg}
                              loading="lazy"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
