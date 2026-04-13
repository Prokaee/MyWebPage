import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { skills } from "../../data/skills";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={2} title="Skills" />
        </FadeIn>

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.05}>
              <div
                className={styles.cell}
                style={{ gridColumn: skill.span === 2 ? "span 2" : "span 1" }}
              >
                <span className={styles.name}>{skill.name}</span>
                {skill.context && (
                  <span className={styles.context}>{skill.context}</span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
