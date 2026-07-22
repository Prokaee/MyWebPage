import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../store/AppStore";
import { makeDraft } from "../../data/seed";

/** Ladezustand: erzeugt den erkannten Beleg-Draft und springt automatisch weiter. */
export default function Recognizing() {
  const navigate = useNavigate();
  const { setDraft } = useApp();

  useEffect(() => {
    setDraft(makeDraft());
    const t = setTimeout(() => navigate("/scan/pruefen"), 1900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="recognizing">
      <div className="spinner" />
      <div>
        <h2 style={{ fontSize: "var(--font-size-lg)", fontWeight: 700 }}>Beleg wird erkannt …</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Belegtyp, Beträge, USt und Partner werden ausgelesen.
        </p>
      </div>
      <div className="stack-sm" style={{ width: "100%", maxWidth: 260 }}>
        <div className="skeleton" style={{ height: 14, width: "80%" }} />
        <div className="skeleton" style={{ height: 14, width: "60%" }} />
        <div className="skeleton" style={{ height: 14, width: "70%" }} />
      </div>
    </div>
  );
}
