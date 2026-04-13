import styles from "./SectionHeading.module.css";

export default function SectionHeading({ index, title }) {
  return (
    <div className={styles.heading}>
      <span className={styles.index}>// {String(index).padStart(2, "0")}</span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
