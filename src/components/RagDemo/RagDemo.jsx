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

const DEMO_QUESTION = "Was ist Retrieval Augmented Generation?";

const STAGE_DETAILS = {
  query: (q) => ({
    output: q,
    explain: "Eine Frage kommt rein, ganz normaler Text, noch nichts Besonderes.",
  }),
  embedding: () => ({
    output: "[0.23, 0.87, -0.12, 0.45, ...]",
    explain:
      "Der Text wird in einen Zahlenvektor umgewandelt. So kann der Computer die Bedeutung vergleichen, nicht nur einzelne Wörter, sondern was wirklich gemeint ist.",
  }),
  search: () => ({
    output: "cosine_similarity > 0.82 → 3 Treffer",
    explain:
      "Mit dem Vektor wird in einer Datenbank (z.B. ChromaDB) nach den semantisch ähnlichsten Einträgen gesucht. Vorteil gegenüber Keyword-Suche: es findet auch Treffer, die die Frage anders formulieren.",
  }),
  docs: () => ({
    output: "\"RAG kombiniert Retrieval mit Generierung...\"",
    explain:
      "Die relevantesten Textabschnitte werden zurückgegeben. Das ist der Kern von RAG: statt alles in den Kontext zu stopfen, werden gezielt nur die Stellen geholt, die zur Frage passen. Spart Tokens und ist präziser.",
  }),
  llm: () => ({
    output: "Frage + Kontext → Generierung...",
    explain:
      "Die gefundenen Dokumente werden zusammen mit der Frage ans LLM übergeben. Das Modell hat jetzt echtes Wissen als Grundlage, nicht nur sein Training.",
  }),
  answer: () => ({
    output:
      "RAG ist ein Verfahren, bei dem ein LLM mit externem Wissen aus einer Vektordatenbank angereichert wird, um präzisere und aktuellere Antworten zu geben.",
    explain:
      "Die Antwort basiert auf konkreten Quellen. Weniger Halluzinationen, aktuelleres Wissen, nachvollziehbar. Deshalb RAG statt einfach alles in den Prompt packen.",
  }),
};

export default function RagDemo() {
  const [activeStage, setActiveStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const question = DEMO_QUESTION;
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

    const delays = [200, 1200, 2200, 3200, 4200, 5200];

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
            <span className={styles.label}>// Was mich gerade begeistert</span>
            <h2 className={styles.title}>So funktioniert RAG :)</h2>
            <p className={styles.subtitle}>
              Retrieval Augmented Generation, da bin ich gerade voll drin.
              Auch das Thema meiner Bachelorarbeit. Hier mal Schritt für
              Schritt, was da eigentlich passiert.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={styles.inputRow}>
            <span className={styles.question}>{question}</span>
            <button className={styles.startBtn} onClick={run} disabled={running}>
              {running ? "Läuft..." : "Demo starten"}
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.pipeline}>
            {STAGES.map((stage, i) => {
              const isActive = activeStage >= i;
              const data = isActive ? getStageData(stage) : null;

              return (
                <div key={stage.id} className={styles.step}>
                  <div className={styles.nodeCol}>
                    <div className={`${styles.node} ${isActive ? styles.active : ""}`}>
                      <span className={styles.icon}>{stage.icon}</span>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className={styles.line} />
                    )}
                  </div>
                  <div className={styles.info}>
                    <span className={`${styles.stageName} ${isActive ? styles.stageNameActive : ""}`}>
                      {stage.label}
                    </span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className={styles.detail}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className={styles.output}>{data.output}</p>
                          <p className={styles.explain}>{data.explain}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
