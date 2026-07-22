import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../store/AppStore";
import EditableField from "../../components/EditableField";
import { IconChevronLeft, IconWarn } from "../../components/icons";

const num = (s: string) => {
  const n = Number(s.replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

/** OCR-/Vision-Ergebnis pruefen: erkannte Felder editierbar, Unsicherheiten markiert. */
export default function ReviewExtraction() {
  const navigate = useNavigate();
  const { state, patchDraftData } = useApp();
  const draft = state.draft;

  useEffect(() => {
    if (!draft) navigate("/scan", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  if (!draft) return null;
  const d = draft.data;
  const vatUncertain = d.uncertainties.some((u) => u.toLowerCase().includes("ust"));
  const confidence = Math.round((d.confidence ?? 0) * 100);

  return (
    <div className="screen">
      <div className="navhead">
        <button className="iconbtn iconbtn--back" aria-label="Zurück" onClick={() => navigate("/scan")}>
          <IconChevronLeft size={26} />
        </button>
        <div className="navhead__title">Erkannte Daten</div>
        <span />
      </div>

      <p className="muted" style={{ marginBottom: "var(--space-3)" }}>
        Automatisch erkannt – bitte kurz prüfen und ggf. korrigieren.
      </p>

      <div className="confidence">
        <div className="confidence__track">
          <div className="confidence__fill" style={{ width: `${confidence}%` }} />
        </div>
        <span className="muted" style={{ fontSize: "var(--font-size-sm)" }}>{confidence}% sicher</span>
      </div>

      {d.uncertainties.length > 0 && (
        <div className="chip-warn" style={{ marginBottom: "var(--space-4)" }}>
          <IconWarn size={14} /> {d.uncertainties[0]}
        </div>
      )}

      <div className="card">
        <EditableField label="Partner" value={d.partnerName ?? ""} onChange={(v) => patchDraftData({ partnerName: v })} />
        <EditableField label="UID" value={d.partnerVatId ?? ""} onChange={(v) => patchDraftData({ partnerVatId: v })} />
        <EditableField label="Beleg-Nr." value={d.receiptNo ?? ""} onChange={(v) => patchDraftData({ receiptNo: v })} />
        <EditableField label="Datum (ISO)" value={d.receiptDate ?? ""} onChange={(v) => patchDraftData({ receiptDate: v })} />
        <EditableField label="Netto" value={String(d.net ?? "")} numeric onChange={(v) => patchDraftData({ net: num(v) })} />
        <EditableField label="USt-Satz %" value={String(d.vatRate ?? "")} numeric uncertain={vatUncertain} onChange={(v) => patchDraftData({ vatRate: num(v) })} />
        <EditableField label="USt-Betrag" value={String(d.vatAmount ?? "")} numeric onChange={(v) => patchDraftData({ vatAmount: num(v) })} />
        <EditableField label="Brutto" value={String(d.gross ?? "")} numeric onChange={(v) => patchDraftData({ gross: num(v) })} />
      </div>

      <button className="btn btn--primary mt-6" onClick={() => navigate("/scan/kontierung")}>
        Weiter zur Kontierung
      </button>
    </div>
  );
}
