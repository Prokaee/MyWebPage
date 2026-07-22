import { useParams } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { euro, formatDate, rechnungTotals } from "../data/seed";
import BackHeader from "../components/BackHeader";

export default function RechnungVorschau() {
  const { id } = useParams();
  const { state, updateRechnung } = useApp();
  const r = state.rechnungen.find((x) => x.id === id);

  if (!r) {
    return (
      <div className="screen">
        <BackHeader title="Rechnung" to="/rechnungen" />
        <p className="muted">Rechnung nicht gefunden.</p>
      </div>
    );
  }

  const kontakt = state.kontakte.find((k) => k.id === r.kontaktId);
  const t = rechnungTotals(r.positionen);

  return (
    <div className="screen" style={{ paddingBottom: 120 }}>
      <BackHeader title={r.nummer} to="/rechnungen" />

      <div className="card">
        <div className="row-between" style={{ marginBottom: "var(--space-4)" }}>
          <div>
            <div className="muted" style={{ fontSize: "var(--font-size-sm)" }}>Rechnung an</div>
            <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{kontakt?.name ?? "Ohne Kontakt"}</div>
            {kontakt?.uid && <div className="muted" style={{ fontSize: "var(--font-size-sm)" }}>{kontakt.uid}</div>}
          </div>
          <span className={r.status === "bezahlt" ? "badge badge--success" : "badge badge--warning"}>{r.status}</span>
        </div>
        <div className="field"><span className="field__label">Rechnungs-Nr.</span><span className="field__value">{r.nummer}</span></div>
        <div className="field"><span className="field__label">Datum</span><span className="field__value">{formatDate(r.datum)}</span></div>
        <div className="field"><span className="field__label">Fällig in</span><span className="field__value">{r.faelligkeitTage} Tagen</span></div>
      </div>

      <h3 className="section-label mt-6">Positionen</h3>
      <div className="card">
        {r.positionen.map((p) => (
          <div key={p.id} className="field">
            <span>
              <div style={{ fontWeight: 600 }}>{p.bezeichnung}</div>
              <div className="muted" style={{ fontSize: "var(--font-size-sm)" }}>
                {p.menge} × {euro(p.einzelpreis)} · {p.ustSatz} % USt
              </div>
            </span>
            <span className="field__value">{euro(p.menge * p.einzelpreis)}</span>
          </div>
        ))}
        <div className="field"><span className="field__label">Netto</span><span className="field__value">{euro(t.net)}</span></div>
        <div className="field"><span className="field__label">USt</span><span className="field__value">{euro(t.vat)}</span></div>
        <div className="field"><span className="field__label" style={{ fontWeight: 700, color: "var(--color-text)" }}>Gesamt Brutto</span><span className="field__value" style={{ fontSize: "var(--font-size-lg)" }}>{euro(t.gross)}</span></div>
      </div>

      {r.status !== "bezahlt" && (
        <div className="sticky-footer">
          <button className="btn btn--primary" onClick={() => updateRechnung({ ...r, status: "bezahlt" })}>
            Als bezahlt markieren
          </button>
        </div>
      )}
    </div>
  );
}
