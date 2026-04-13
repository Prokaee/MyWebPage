import { motion } from "framer-motion";
import StatusIndicator from "../shared/StatusIndicator";
import { meta } from "../../data/meta";
import styles from "./Hero.module.css";

const nameLines = ["Michael", "Prokop"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.3 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <motion.h1
          className={styles.name}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {nameLines.map((line, li) => (
            <span key={li} className={styles.nameLine}>
              {line.split("").map((char, ci) => (
                <motion.span key={`${li}-${ci}`} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {meta.tagline}
        </motion.p>

        <motion.div
          className={styles.statusWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <StatusIndicator text={meta.status} />
        </motion.div>
      </div>
    </section>
  );
}
