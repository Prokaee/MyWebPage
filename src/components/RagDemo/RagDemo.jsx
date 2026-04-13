import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../shared/FadeIn";
import styles from "./RagDemo.module.css";

const STAGES = [
  { id: "query", label: "Frage", icon: "?" },
  { id: "embedding", label: "Embedding", icon: "[ ]" },
  { id: "search", label: "Vektorsuche", icon: "⟐" },
  { id: "docs", label: "Dokumente", icon: "▤" },
  { id: "llm", label: "LLM", icon: "◈" },
  { id: "answer", label: "Antwort", icon: "✦" },
];

const DEMO_QUESTIONS = [
  "Was ist Retrieval Augmented Generation?",
  "Wie funktioniert eine Vektordatenbank?",
  "Was sind Multi-Agenten-Systeme?",
];

const STAGE_DETAILS = {
  query: (q) => ({
    output: q,
    explain: "Jemand stellt eine Frage — ganz normal, als Text.",
  }),
  embedding: () => ({
    output: "[0.23, 0.87, -0.12, 0.45, ...]",
    explain:
      "Der Computer kann keinen Text lesen wie wir. Also wird die Frage in Zahlen übersetzt — so versteht er, was gemeint ist.",
  }),
  search: () => ({
    output: "3 passende Stellen gefunden",
    explain:
      "Mit diesen Zahlen sucht er in einem riesigen Bücherregal nach den Seiten, die am besten zur Frage passen.",
  }),
  docs: () => ({
    output:
      "\"RAG kombiniert Retrieval mit Generierung...\"",
    explain:
      "Er zieht die passenden Seiten raus. Das sind echte Texte mit echtem Wissen — nicht ausgedacht.",
  }),
  llm: () => ({
    output: "Frage + Wissen → Antwort schreiben...",
    explain:
      "Jetzt liest die KI die Frage und die gefundenen Texte zusammen — und schreibt daraus eine Antwort in eigenen Worten.",
  }),
  answer: () => ({
    output:
      "RAG ist ein Verfahren, bei dem eine KI zuerst in einer Wissensdatenbank nachschlägt, bevor sie antwortet — so werden die Antworten genauer und aktueller.",
    explain:
      "Fertig! Die Antwort basiert auf echtem Wissen, nicht nur auf dem was die KI mal gelernt hat.",
  }),
};

export default function RagDemo() {
  const [activeStage, setActiveStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [question, setQuestion] = useState(DEMO_QUESTIONS[0]);
  const [typedAnswer, setTypedAnswer] = useState("");
  const timersRef = useRef([]);

  const reset = () => {
    setActiveStage(-1);
    setRunning(false);
    setTypedAnswer("");
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const run = () => {
    if (running) return;
    reset();
    setRunning(true);

    const delays = [200, 1000, 1800, 2600, 3400, 4200];

    delays.forEach((delay, i) => {
      const t = setTimeout(() => {
        setActiveStage(i);

        if (i === STAGES.length - 1) {
          const fullAnswer = STAGE_DETAILS.answer().output;
          let charIndex = 0;
          const typeInterval = setInterval(() => {
            charIndex++;
            setTypedAnswer(fullAnswer.slice(0, charIndex));
            if (charIndex >= fullAnswer.length) {
              clearInterval(typeInterval);
              setRunning(false);
            }
          }, 18);
          timersRef.current.push(typeInterval);
        }
      }, delay);
      timersRef.current.push(t);
    });
  };

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const getStageData = (stage) => {
    if (stage.id === "query") return STAGE_DETAILS.query(question);
    if (stage.id === "answer") {
      const data = STAGE_DETAILS.answer();
      return { ...data, output: typedAnswer || "..." };
    }
    return STAGE_DETAILS[stage.id]();
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <span className={styles.label}>// Interaktive Demo</span>
            <h2 className={styles.title}>So funktioniert RAG</h2>
            <p className={styles.subtitle}>
              Retrieval Augmented Generation — das Thema meiner Bachelorarbeit.
              Eine Frage rein, und los geht's.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={styles.inputRow}>
            <select
              className={styles.select}
              value={question}
              onChange={(e) => { setQuestion(e.target.value); reset(); }}
            >
              {DEMO_QUESTIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            <button className={styles.startBtn} onClick={run} disabled={running}>
              {running ? "Läuft..." : "Demo starten"}
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.pipeline}>
            {STAGES.map((stage, i) => (
              <div key={stage.id} className={styles.step}>
                {i > 0 && (
                  <div className={styles.connector}>
                    <div className={styles.connectorLine} />
                    <AnimatePresence>
                      {activeStage >= i && (
                        <motion.div
                          className={styles.particle}
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )}
                <div className={styles.row}>
                  <div className={`${styles.node} ${activeStage >= i ? styles.active : ""}`}>
                    <span className={styles.icon}>{stage.icon}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={`${styles.stageName} ${activeStage >= i ? styles.stageNameActive : ""}`}>
                      {stage.label}
                    </span>
                    <AnimatePresence>
                      {activeStage >= i && (
                        <motion.p
                          className={styles.detail}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {getDetail(stage)}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
