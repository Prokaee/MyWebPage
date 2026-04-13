import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { meta } from "../../data/meta";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={5} title="Contact" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className={styles.intro}>
            Got a question, a project idea, or just want to say hi? Drop me a
            line.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a href={`mailto:${meta.email}`} className={styles.email}>
            {meta.email}
          </a>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className={styles.links}>
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              github.com/Prokaee &rarr;
            </a>
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              LinkedIn &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
