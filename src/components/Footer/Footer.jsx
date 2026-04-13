import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>&copy; 2026 Michael Prokop</span>
        <span className={styles.built}>Gebaut mit React</span>
      </div>
    </footer>
  );
}
