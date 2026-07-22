import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/BackHeader";
import { IconCamera, IconUpload } from "../../components/icons";

export default function Capture() {
  const navigate = useNavigate();
  return (
    <div className="screen" style={{ display: "flex", flexDirection: "column" }}>
      <BackHeader title="Beleg scannen" to="/ausgaben" />

      <div className="scanframe" style={{ marginBottom: "var(--space-5)" }}>
        <div style={{ textAlign: "center" }}>
          <IconCamera size={44} />
          <p style={{ marginTop: 8 }}>Beleg im Rahmen positionieren</p>
        </div>
      </div>

      <p className="muted" style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
        Foto aufnehmen oder aus der Galerie wählen – die Belegdaten werden
        automatisch erkannt.
      </p>

      <div className="stack-sm" style={{ marginTop: "auto" }}>
        <button className="btn btn--primary" onClick={() => navigate("/scan/erkennung")}>
          <IconCamera size={20} /> Foto aufnehmen
        </button>
        <button className="btn btn--secondary" onClick={() => navigate("/scan/erkennung")}>
          <IconUpload size={20} /> Aus Galerie wählen
        </button>
      </div>
    </div>
  );
}
