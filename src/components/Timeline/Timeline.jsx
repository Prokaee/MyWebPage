import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { timeline } from "../../data/timeline";
import styles from "./Timeline.module.css";

export default function Timeline() {
  return (
    <section id="timeline" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={4} title="Timeline" />
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
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
