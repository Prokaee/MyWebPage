import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { euro, makeId, nextRechnungNr, rechnungTotals } from "../data/seed";
import type { Position, Rechnung } from "../types";
import BackHeader from "../components/BackHeader";
import ContactPickerSheet from "../components/ContactPickerSheet";
import { IconTrash, IconPlus, IconChevronDown } from "../components/icons";

const num = (s: string) => {
  const n = Number(s.replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

const emptyPos = (): Position => ({ id: makeId(), bezeichnung: "", menge: 1, einzelpreis: 0, ustSatz: 20 });

export default function NeueRechnung() {
  const navigate = useNavigate();
  const { state, addRechnung } = useApp();

  const [kontaktId, setKontaktId] = useState<string | undefined>();
  const [positionen, setPositionen] = useState<Position[]>([emptyPos()]);
  const [faelligkeitTage] = useState(14);
  const [showPicker, setShowPicker] = useState(false);

  const kontakt = state.kontakte.find((k) => k.id === kontaktId);
  const totals = rechnungTotals(positionen);
  const valid = !!kontaktId && positionen.some((p) => p.bezeichnung.trim() && p.einzelpreis > 0);

  const patchPos = (id: string, patch: Partial<Position>) =>
    setPositionen((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const removePos = (id: string) => setPositionen((ps) => ps.filter((p) => p.id !== id));

  const save = () => {
    const rechnung: Rechnung = {
      id: makeId(),
      nummer: nextRechnungNr(state.rechnungen),
      kontaktId,
      datum: new Date().toISOString().slice(0, 10),
      faelligkeitTage,
      positionen: positionen.filter((p) => p.bezeichnung.trim()),
      status: "offen",
    };
    addRechnung(rechnung);
    navigate(`/rechnungen/${rechnung.id}`, { replace: true });
  };

  return (
    <div className="screen" style={{ paddingBottom: 150 }}>
      <BackHeader title="Neue Rechnung" to="/rechnungen" />

      <h3 className="section-label">Rechnung an</h3>
      <button className="btn btn--secondary" style={{ marginBottom: "var(--space-5)" }} onClick={() => setShowPicker(true)}>
        {kontakt ? kontakt.name : "Kunde auswählen"}
      </button>

      <div className="row-between" style={{ marginBottom: "var(--space-3)" }}>
        <h3 className="section-label" style={{ margin: 0 }}>Positionen</h3>
        <button className="textbtn" onClick={() => setPositionen((ps) => [...ps, emptyPos()])}>
          <IconPlus size={16} style={{ verticalAlign: "middle" }} /> Hinzufügen
        </button>
      </div>

      {positionen.map((p) => (
        <div key={p.id} className="pos">
          <div className="pos__head">
            <input
              className="input"
              placeholder="Bezeichnung / Leistung"
              value={p.bezeichnung}
              onChange={(e) => patchPos(p.id, { bezeichnung: e.target.value })}
            />
            {positionen.length > 1 && (
              <button className="iconbtn" aria-label="Position entfernen" onClick={() => removePos(p.id)}>
                <IconTrash size={20} />
              </button>
            )}
          </div>
          <div className="pos__grid">
            <div>
              <label className="input-label">Menge</label>
              <input className="input" inputMode="decimal" value={p.menge} onChange={(e) => patchPos(p.id, { menge: num(e.target.value) })} />
            </div>
            <div>
              <label className="input-label">Einzelpreis netto</label>
              <input className="input" inputMode="decimal" value={p.einzelpreis} onChange={(e) => patchPos(p.id, { einzelpreis: num(e.target.value) })} />
            </div>
          </div>
          <div className="pos__grid">
            <div>
              <label className="input-label">USt %</label>
              <input className="input" inputMode="decimal" value={p.ustSatz} onChange={(e) => patchPos(p.id, { ustSatz: num(e.target.value) })} />
            </div>
            <div>
              <label className="input-label">Zeilensumme</label>
              <div className="input" style={{ display: "flex", alignItems: "center", background: "var(--color-surface)" }}>
                {euro(p.menge * p.einzelpreis)}
              </div>
            </div>
          </div>
        </div>
      ))}

      <h3 className="section-label mt-6">Details</h3>
      <div className="card row-between">
        <div>
          <div style={{ fontWeight: 600 }}>Rechnungs-Nr. {nextRechnungNr(state.rechnungen)}</div>
          <div className="muted" style={{ marginTop: 4 }}>
            Heute · Fällig in {faelligkeitTage} Tagen
          </div>
        </div>
        <IconChevronDown size={20} className="muted" />
      </div>

      {/* Sticky Summe + Speichern */}
      <div className="sticky-footer">
        <div className="footer-summary">
          <div>
            <div style={{ fontWeight: 700 }}>Gesamt Brutto</div>
            <div className="muted" style={{ fontSize: "var(--font-size-sm)" }}>
              Netto {euro(totals.net)} · USt {euro(totals.vat)}
            </div>
          </div>
          <div className="amount">{euro(totals.gross)}</div>
        </div>
        <button className="btn btn--primary" disabled={!valid} onClick={save}>
          Speichern & Vorschau
        </button>
      </div>

      {showPicker && (
        <ContactPickerSheet
          onClose={() => setShowPicker(false)}
          onSelect={(k) => {
            setKontaktId(k.id);
            setShowPicker(false);
          }}
        />
      )}
    </div>
  );
}
