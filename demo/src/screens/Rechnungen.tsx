import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { euro, formatDate } from "../data/seed";
import { rechnungGross } from "../store/selectors";
import type { RechnungStatus } from "../types";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import { IconPlus, IconInvoice } from "../components/icons";

const STATUS_BADGE: Record<RechnungStatus, string> = {
  entwurf: "badge badge--neutral",
  offen: "badge badge--warning",
  teilbezahlt: "badge badge--warning",
  bezahlt: "badge badge--success",
};

export default function Rechnungen() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [query, setQuery] = useState("");

  const kontaktName = (id?: string) => state.kontakte.find((k) => k.id === id)?.name ?? "Ohne Kontakt";

  const rechnungen = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.rechnungen.filter(
      (r) => !q || r.nummer.toLowerCase().includes(q) || kontaktName(r.kontaktId).toLowerCase().includes(q),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rechnungen, state.kontakte, query]);

  const isEmpty = state.rechnungen.length === 0;

  return (
    <div className="screen" style={{ display: "flex", flexDirection: "column" }}>
      <div className="topbar">
        <h1 className="topbar__title">Rechnungen</h1>
        <div className="topbar__actions">
          <button className="iconbtn" aria-label="Neue Rechnung" onClick={() => navigate("/rechnungen/neu")}>
            <IconPlus size={22} />
          </button>
        </div>
      </div>

      {isEmpty ? (
        <>
          <EmptyState
            title="Schreibe professionelle Rechnungen"
            points={[
              "Schnell und automatisiert gesetzeskonforme Rechnungen erstellen",
              "Rechnungen direkt deinen Bank-Zahlungen zuordnen",
              "Ständige Übersicht über deine Einnahmen",
            ]}
          />
          <button className="btn btn--primary" style={{ marginTop: "auto" }} onClick={() => navigate("/rechnungen/neu")}>
            Rechnung erstellen
          </button>
        </>
      ) : (
        <>
          <SearchBar value={query} onChange={setQuery} placeholder="Rechnungen durchsuchen …" />
          <div className="list">
            {rechnungen.map((r) => (
              <button key={r.id} className="beleg-row" onClick={() => navigate(`/rechnungen/${r.id}`)}>
                <span className="beleg-row__thumb"><IconInvoice size={22} /></span>
                <span className="beleg-row__main">
                  <span className="beleg-row__title">{kontaktName(r.kontaktId)}</span>
                  <span className="beleg-row__sub">{r.nummer} · {formatDate(r.datum)}</span>
                </span>
                <span className="beleg-row__amount">
                  <div className="amount" style={{ fontSize: "var(--font-size-md)" }}>{euro(rechnungGross(r))}</div>
                  <span className={STATUS_BADGE[r.status]} style={{ fontSize: "var(--font-size-xs)" }}>{r.status}</span>
                </span>
              </button>
            ))}
            {rechnungen.length === 0 && (
              <p className="muted" style={{ textAlign: "center", padding: "var(--space-6)" }}>Keine Rechnungen gefunden.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
