import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { skillClusters } from "../../data/skills";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={2} title="Kenntnisse" />
        </FadeIn>

        <div className={styles.clusters}>
          {skillClusters.map((cluster, ci) => (
            <FadeIn key={cluster.id} delay={ci * 0.15}>
              <div className={styles.cluster}>
                <div className={styles.root}>
                  <span className={styles.rootName}>{cluster.name}</span>
                  {cluster.context && (
                    <span className={styles.rootContext}>
                      {cluster.context}
                    </span>
                  )}
                </div>

                <div className={styles.tree}>
                  {cluster.children.map((child, chi) => (
                    <FadeIn
                      key={child.name}
                      delay={ci * 0.15 + (chi + 1) * 0.04}
                    >
                      <div className={styles.branch}>
                        <span className={styles.childName}>{child.name}</span>
                        {child.context && (
                          <span className={styles.childContext}>
                            {child.context}
                          </span>
                        )}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
