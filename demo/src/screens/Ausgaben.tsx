import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { euro, formatDate } from "../data/seed";
import type { Beleg, BelegStatus } from "../types";
import {
  IconCamera,
  IconUpload,
  IconPlus,
  IconSort,
  IconReceipt,
  IconArrowRight,
} from "../components/icons";
import SearchBar from "../components/SearchBar";

const FILTERS: { key: "alle" | BelegStatus; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "erkannt", label: "Erkannt" },
  { key: "gebucht", label: "Gebucht" },
  { key: "offen", label: "Offen" },
];

const STATUS_BADGE: Record<BelegStatus, string> = {
  erkannt: "badge badge--warning",
  gebucht: "badge badge--success",
  offen: "badge badge--neutral",
};

type Sort = "datum" | "betrag";

export default function Ausgaben() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [filter, setFilter] = useState<"alle" | BelegStatus>("alle");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("datum");

  const belege = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.belege
      .filter((b) => filter === "alle" || b.status === filter)
      .filter(
        (b) =>
          !q ||
          (b.data.partnerName ?? "").toLowerCase().includes(q) ||
          (b.data.summary ?? "").toLowerCase().includes(q) ||
          (b.data.receiptNo ?? "").toLowerCase().includes(q),
      )
      .sort((a, b) =>
        sort === "betrag"
          ? (b.data.gross ?? 0) - (a.data.gross ?? 0)
          : (b.data.receiptDate ?? "").localeCompare(a.data.receiptDate ?? ""),
      );
  }, [state.belege, filter, query, sort]);

  return (
    <div className="screen">
      <div className="topbar">
        <h1 className="topbar__title">Ausgaben</h1>
        <div className="topbar__actions">
          <button className="iconbtn" aria-label="Beleg scannen" onClick={() => navigate("/scan")}>
            <IconPlus size={22} />
          </button>
          <button
            className="iconbtn"
            aria-label={`Sortiert nach ${sort === "datum" ? "Datum" : "Betrag"}`}
            onClick={() => setSort((s) => (s === "datum" ? "betrag" : "datum"))}
          >
            <IconSort size={22} />
          </button>
        </div>
      </div>

      {/* Beleg scannen — dominante Primär-Aktion */}
      <button className="scan-cta" onClick={() => navigate("/scan")}>
        <span className="scan-cta__icon"><IconCamera size={28} /></span>
        <span className="scan-cta__text">
          <span className="scan-cta__title">Beleg scannen</span>
          <span className="scan-cta__sub">Foto machen – Daten werden automatisch erkannt</span>
        </span>
        <IconArrowRight size={22} style={{ color: "rgba(255,255,255,0.55)", flex: "none" }} />
      </button>
      <button className="btn btn--ghost" style={{ marginBottom: "var(--space-4)" }} onClick={() => navigate("/scan")}>
        <IconUpload size={20} /> Beleg hochladen
      </button>

      <SearchBar value={query} onChange={setQuery} placeholder="Belege durchsuchen …" />

      <div className="tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={"tab" + (filter === f.key ? " is-active" : "")}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="list">
        {belege.map((b) => (
          <BelegRow key={b.id} beleg={b} onClick={() => navigate(`/ausgaben/${b.id}`)} />
        ))}
        {belege.length === 0 && (
          <p className="muted" style={{ textAlign: "center", padding: "var(--space-6)" }}>
            Keine Belege gefunden.
          </p>
        )}
      </div>
    </div>
  );
}

function BelegRow({ beleg, onClick }: { beleg: Beleg; onClick: () => void }) {
  return (
    <button className="beleg-row" onClick={onClick}>
      <span className="beleg-row__thumb"><IconReceipt size={22} /></span>
      <span className="beleg-row__main">
        <span className="beleg-row__title">{beleg.data.partnerName ?? beleg.name}</span>
        <span className="beleg-row__sub">
          {formatDate(beleg.data.receiptDate)} · {beleg.data.summary}
        </span>
      </span>
      <span className="beleg-row__amount">
        <div className="amount" style={{ fontSize: "var(--font-size-md)" }}>{euro(beleg.data.gross)}</div>
        <span className={STATUS_BADGE[beleg.status]} style={{ fontSize: "var(--font-size-xs)" }}>
          {beleg.status}
        </span>
      </span>
    </button>
  );
}
