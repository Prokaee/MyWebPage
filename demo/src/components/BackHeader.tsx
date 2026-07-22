import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "./icons";

/** Header mit Zurueck-Pfeil und zentriertem Titel (Detail-/Flow-Screens). */
export default function BackHeader({
  title,
  to,
}: {
  title: string;
  to?: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="navhead">
      <button
        className="iconbtn iconbtn--back"
        aria-label="Zurück"
        onClick={() => (to ? navigate(to) : navigate(-1))}
      >
        <IconChevronLeft size={26} />
      </button>
      <div className="navhead__title">{title}</div>
      <span />
    </div>
  );
}
