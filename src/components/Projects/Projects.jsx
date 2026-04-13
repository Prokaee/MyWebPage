import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import FadeIn from "../shared/FadeIn";
import { projects } from "../../data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <FadeIn>
          <SectionHeading index={3} title="Projects" />
        </FadeIn>

        <div className={styles.list}>
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <motion.div
                className={`${styles.row} ${project.featured ? styles.featured : ""}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.year}>{project.year}</span>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <div className={styles.tags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className={styles.description}>{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View project &rarr;
                    </a>
                  )}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
