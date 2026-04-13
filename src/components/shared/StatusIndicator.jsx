import styles from "./StatusIndicator.module.css";

export default function StatusIndicator({ text }) {
  return (
    <div className={styles.status}>
      <span className={styles.dot} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}
