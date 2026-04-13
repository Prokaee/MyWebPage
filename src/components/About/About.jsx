import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { meta } from "../../data/meta";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={1} title="About" />
        </FadeIn>

        <div className={styles.grid}>
          <FadeIn delay={0.1}>
            <div className={styles.prose}>
              <p>
                I took the long way into computer science — trained as a baker,
                earned my Matura through a second-chance education program,
                studied ergotherapy, and eventually found my way to what I
                actually wanted to do all along.
              </p>
              <p>
                Now I'm finishing my BSc in Informatik at Universität Innsbruck,
                focused on Linux, containerization, and AI automation. Arch is my
                daily driver. I think in terminals and Docker containers.
              </p>
              <p>
                My bachelor thesis explores multi-agent systems with LangGraph
                and ChromaDB — autonomous agents that research, reason, and
                collaborate. All services Dockerized, deployed with bash scripts.
              </p>
              <p>
                When I'm not at a terminal, I'm on a climbing wall, rolling dice
                at a DnD table, or shuffling a Magic: The Gathering deck.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className={styles.facts}>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>location</span>
                <span className={styles.factValue}>{meta.location}</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>focus</span>
                <span className={styles.factValue}>
                  Infrastructure & AI
                </span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>OS</span>
                <span className={styles.factValue}>Arch Linux (btw)</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>graduating</span>
                <span className={styles.factValue}>July 2026</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>interests</span>
                <span className={styles.factValue}>
                  Climbing, MTG, DnD
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
