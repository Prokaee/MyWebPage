import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { meta } from "../../data/meta";
import mePhoto from "../../assets/me.jpg";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={1} title="Über mich" />
        </FadeIn>

        <div className={styles.grid}>
          <FadeIn delay={0.1}>
            <div className={styles.prose}>
              <p>
                Hey! Ich bin Michael Baujahr 1995, und mein Weg in die Informatik war alles
                andere als geradlinig. Erst Bäckerlehre, dann Matura über den
                zweiten Bildungsweg, Ergotherapie-Studium, und irgendwann hat's
                Klick gemacht: Ich will das mit den Computern machen.
              </p>
              <p>
                Jetzt studiere ich Informatik in Innsbruck und fühle mich zum
                ersten Mal genau am richtigen Platz. Mich begeistert alles rund
                um Linux, Container und wie man Dinge zum Laufen bringt, am
                liebsten mit Docker und einem guten Terminal.
              </p>
              <p>
                Gerade schreibe ich meine Bachelorarbeit über
                Multi-Agenten-Systeme mit LangGraph und ChromaDB. Klingt
                kompliziert, macht aber richtig Spaß. In letzter Zeit
                arbeite ich auch gerne mit KI-Tools wie Claude Code,
                ein super Sparringspartner beim Entwickeln.
              </p>
              <p>
                Wenn ich nicht am Rechner sitze, bin ich in der Kletterhalle,
                am Tisch bei DnD oder sortiere mein Magic-Deck zum hundertsten
                Mal um.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className={styles.sidebar}>
              <div className={styles.photoWrap}>
                <img
                  src={mePhoto}
                  alt="Michael Prokop"
                  className={styles.photo}
                />
              </div>
              <div className={styles.facts}>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>standort</span>
                  <span className={styles.factValue}>{meta.location}</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>fokus</span>
                  <span className={styles.factValue}>
                    Infrastruktur & AI
                  </span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>OS</span>
                  <span className={styles.factValue}>Arch Linux (btw)</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>abschluss</span>
                  <span className={styles.factValue}>Juli 2026</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>sonst so</span>
                  <span className={styles.factValue}>
                    Klettern, MTG, DnD
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
