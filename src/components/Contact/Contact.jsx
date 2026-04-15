import { useState } from "react";
import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { meta } from "../../data/meta";
import styles from "./Contact.module.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(meta.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={5} title="Kontakt" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className={styles.intro}>
            Lust auf ein Gespräch, eine Idee, oder einfach Hallo sagen?
            Ich freu mich über jede Nachricht.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <button onClick={copyEmail} className={styles.email} title="Klick zum Kopieren">
            <span className={copied ? styles.labelHidden : styles.label}>{meta.email}</span>
            <span className={copied ? styles.label : styles.labelHidden}>Kopiert!</span>
          </button>
        </FadeIn>

        <FadeIn delay={0.25}>
          <a href={`tel:${meta.phone.replace(/\s/g, "")}`} className={styles.email}>
            {meta.phone}
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

        <FadeIn delay={0.4}>
          <p className={styles.freelance}>
            Du brauchst eine Webseite, AI-Automatisierungen oder ein
            RAG-System? Meld dich gerne, ich mach das auch freiberuflich :)
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
