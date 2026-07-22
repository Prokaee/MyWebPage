import { IconCheckCircle } from "./icons";

/** Empty-State-Karte mit Titel und Haekchen-Liste (wie sevDesk). */
export default function EmptyState({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="empty">
      <h2 className="empty__title">{title}</h2>
      {points.map((p) => (
        <div key={p} className="empty__item">
          <IconCheckCircle size={22} className="empty__check" />
          <span>{p}</span>
        </div>
      ))}
    </div>
  );
}
