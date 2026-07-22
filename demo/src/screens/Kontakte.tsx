import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/AppStore";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import { IconPlus, IconUser } from "../components/icons";

export default function Kontakte() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [query, setQuery] = useState("");

  const kontakte = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.kontakte.filter((k) => !q || k.name.toLowerCase().includes(q));
  }, [state.kontakte, query]);

  const isEmpty = state.kontakte.length === 0;

  return (
    <div className="screen" style={{ display: "flex", flexDirection: "column" }}>
      <div className="topbar">
        <h1 className="topbar__title">Kontakte</h1>
        <div className="topbar__actions">
          <button className="iconbtn" aria-label="Kontakt hinzufügen" onClick={() => navigate("/kontakte/neu")}>
            <IconPlus size={22} />
          </button>
        </div>
      </div>

      {isEmpty ? (
        <>
          <EmptyState
            title="Verwalte Kunden & Lieferanten"
            points={[
              "Alle Kontaktdaten an einem Ort",
              "Rechnungen und Belege direkt zuordnen",
              "Offene Posten je Kontakt im Blick",
            ]}
          />
          <button className="btn btn--primary" style={{ marginTop: "auto" }} onClick={() => navigate("/kontakte/neu")}>
            Kontakt hinzufügen
          </button>
        </>
      ) : (
        <>
          <SearchBar value={query} onChange={setQuery} placeholder="Kontakte durchsuchen …" />
          <div className="list">
            {kontakte.map((k) => (
              <div key={k.id} className="beleg-row" style={{ cursor: "default" }}>
                <span className="beleg-row__thumb"><IconUser size={22} /></span>
                <span className="beleg-row__main">
                  <span className="beleg-row__title">{k.name}</span>
                  <span className="beleg-row__sub">{k.uid ?? k.email ?? "—"}</span>
                </span>
                <span className={"badge " + (k.typ === "Kunde" ? "badge--success" : "badge--neutral")}>{k.typ}</span>
              </div>
            ))}
            {kontakte.length === 0 && (
              <p className="muted" style={{ textAlign: "center", padding: "var(--space-6)" }}>Keine Kontakte gefunden.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
