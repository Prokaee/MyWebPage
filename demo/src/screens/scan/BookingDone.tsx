import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../store/AppStore";
import { euro } from "../../data/seed";
import { IconCheckCircle } from "../../components/icons";

export default function BookingDone() {
  const navigate = useNavigate();
  const { state, commitDraft } = useApp();
  const committed = useRef(false);

  // Draft-Zusammenfassung festhalten, bevor commitDraft ihn auf null setzt.
  const [summary] = useState(() => ({
    partner: state.draft?.data.partnerName ?? "Beleg",
    gross: state.draft?.data.gross ?? 0,
  }));

  useEffect(() => {
    if (!committed.current) {
      committed.current = true;
      commitDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="success">
      <div className="success__ring">
        <IconCheckCircle size={48} />
      </div>
      <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: 700 }}>Beleg gebucht</h2>
      <p className="muted">
        {summary.partner} · {euro(summary.gross)} wurde verbucht.
      </p>

      <div className="stack-sm" style={{ width: "100%", marginTop: "var(--space-5)" }}>
        <button className="btn btn--primary" onClick={() => navigate("/ausgaben")}>
          Zu den Ausgaben
        </button>
        <button className="btn btn--secondary" onClick={() => navigate("/scan")}>
          Weiteren Beleg scannen
        </button>
      </div>
    </div>
  );
}
