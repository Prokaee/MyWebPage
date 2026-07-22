import { useState } from "react";
import { useApp } from "../store/AppStore";
import { makeId } from "../data/seed";
import type { Kontakt } from "../types";

/** Bottom-Sheet zur Kundenauswahl inkl. schnellem Neu-Anlegen. */
export default function ContactPickerSheet({
  onSelect,
  onClose,
}: {
  onSelect: (k: Kontakt) => void;
  onClose: () => void;
}) {
  const { state, addKontakt } = useApp();
  const kunden = state.kontakte.filter((k) => k.typ === "Kunde");
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");

  const add = () => {
    if (!name.trim()) return;
    const k: Kontakt = { id: makeId(), name: name.trim(), typ: "Kunde", uid: uid.trim() || undefined };
    addKontakt(k);
    onSelect(k);
  };

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="row-between" style={{ marginBottom: "var(--space-4)" }}>
          <h3 style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>Kunde wählen</h3>
          <button className="textbtn" onClick={() => setAdding((a) => !a)}>
            {adding ? "Abbrechen" : "+ Neu"}
          </button>
        </div>

        {adding ? (
          <div className="stack-sm">
            <input className="input" placeholder="Firmen-/Kundenname" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <input className="input" placeholder="UID (optional)" value={uid} onChange={(e) => setUid(e.target.value)} />
            <button className="btn btn--primary" disabled={!name.trim()} onClick={add}>
              Anlegen & wählen
            </button>
          </div>
        ) : (
          <>
            {kunden.map((k) => (
              <button key={k.id} className="pick-row" onClick={() => onSelect(k)}>
                <span>
                  <div style={{ fontWeight: 600 }}>{k.name}</div>
                  <div className="muted" style={{ fontSize: "var(--font-size-sm)" }}>{k.uid ?? "—"}</div>
                </span>
              </button>
            ))}
            {kunden.length === 0 && <p className="muted">Noch keine Kunden. Lege oben einen an.</p>}
          </>
        )}
      </div>
    </div>
  );
}
