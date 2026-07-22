import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../store/AppStore";
import BackHeader from "../../components/BackHeader";
import { accountName, euro } from "../../data/seed";
import { IconCheck } from "../../components/icons";

/** Kontierungsvorschlag: Soll an Haben, Aufwandskonto aus Kandidaten waehlbar. */
export default function ConfirmBooking() {
  const navigate = useNavigate();
  const { state, patchDraftKontierung } = useApp();
  const draft = state.draft;

  useEffect(() => {
    if (!draft) navigate("/scan", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  if (!draft || !draft.kontierung) return null;
  const { data, kontierung: k } = draft;
  const confidence = Math.round((k.confidence ?? 0) * 100);

  return (
    <div className="screen" style={{ paddingBottom: 120 }}>
      <BackHeader title="Kontierung" to="/scan/pruefen" />

      <div className="card" style={{ marginBottom: "var(--space-5)" }}>
        <div className="booking-line">
          <span className="booking-line__side">Soll</span>
          <span className="account__num">{k.debitAccount}</span>
          <span>{accountName(k.debitAccount)}</span>
        </div>
        <div className="booking-line" style={{ borderTop: "1px solid var(--color-border)" }}>
          <span className="booking-line__side">Haben</span>
          <span className="account__num">{k.creditAccount}</span>
          <span>{accountName(k.creditAccount)}</span>
        </div>
        <div className="row-between" style={{ marginTop: "var(--space-3)" }}>
          <span className="muted" style={{ fontSize: "var(--font-size-sm)" }}>Betrag</span>
          <span className="amount">{euro(data.gross)}</span>
        </div>
      </div>

      <div className="confidence">
        <div className="confidence__track">
          <div className="confidence__fill" style={{ width: `${confidence}%` }} />
        </div>
        <span className="muted" style={{ fontSize: "var(--font-size-sm)" }}>{confidence}% sicher</span>
      </div>
      <p className="muted" style={{ fontSize: "var(--font-size-sm)", marginBottom: "var(--space-5)" }}>
        {k.reason}
      </p>

      <h3 className="section-label">Aufwandskonto (Soll)</h3>
      {k.candidates.map((numAcc) => (
        <button
          key={numAcc}
          className={"account" + (numAcc === k.debitAccount ? " is-selected" : "")}
          onClick={() => patchDraftKontierung({ debitAccount: numAcc })}
        >
          <span className="account__num">{numAcc}</span>
          <span className="account__name">{accountName(numAcc)}</span>
          {numAcc === k.debitAccount && <IconCheck size={20} style={{ color: "var(--color-secondary-text)" }} />}
        </button>
      ))}

      <div className="sticky-footer">
        <button className="btn btn--primary" onClick={() => navigate("/scan/fertig")}>
          Buchen
        </button>
      </div>
    </div>
  );
}
