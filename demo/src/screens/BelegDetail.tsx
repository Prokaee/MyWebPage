import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { EXPENSE_ACCOUNTS, accountName, euro, formatDate } from "../data/seed";
import type { Beleg } from "../types";
import EditableField from "../components/EditableField";
import { IconChevronLeft, IconEdit, IconReceipt, IconCheck } from "../components/icons";

const num = (s: string) => {
  const n = Number(s.replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

export default function BelegDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, updateBeleg } = useApp();
  const beleg = state.belege.find((b) => b.id === id);

  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState<Beleg | null>(beleg ?? null);

  if (!beleg || !draft) {
    return (
      <div className="screen">
        <div className="navhead">
          <button className="iconbtn iconbtn--back" onClick={() => navigate("/ausgaben")}>
            <IconChevronLeft size={26} />
          </button>
          <div className="navhead__title">Beleg</div>
          <span />
        </div>
        <p className="muted">Beleg nicht gefunden.</p>
      </div>
    );
  }

  const d = draft.data;
  const k = draft.kontierung;

  const setData = (patch: Partial<typeof d>) => setDraft({ ...draft, data: { ...d, ...patch } });

  const save = () => {
    updateBeleg(draft);
    setEdit(false);
  };

  return (
    <div className="screen">
      <div className="navhead">
        <button className="iconbtn iconbtn--back" aria-label="Zurück" onClick={() => navigate("/ausgaben")}>
          <IconChevronLeft size={26} />
        </button>
        <div className="navhead__title">Beleg</div>
        {edit ? (
          <button className="textbtn" onClick={save}>Fertig</button>
        ) : (
          <button className="iconbtn iconbtn--back" aria-label="Bearbeiten" onClick={() => setEdit(true)}>
            <IconEdit size={22} />
          </button>
        )}
      </div>

      <div className="scanframe" style={{ aspectRatio: "16 / 9", marginBottom: "var(--space-5)" }}>
        <IconReceipt size={40} />
      </div>

      <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: 700 }}>{d.partnerName}</h2>
      <p className="muted" style={{ marginBottom: "var(--space-4)" }}>{d.summary}</p>

      {edit ? (
        <div className="card">
          <EditableField label="Partner" value={d.partnerName ?? ""} onChange={(v) => setData({ partnerName: v })} />
          <EditableField label="Beleg-Nr." value={d.receiptNo ?? ""} onChange={(v) => setData({ receiptNo: v })} />
          <EditableField label="Datum (ISO)" value={d.receiptDate ?? ""} onChange={(v) => setData({ receiptDate: v })} />
          <EditableField label="Netto" value={String(d.net ?? "")} numeric onChange={(v) => setData({ net: num(v) })} />
          <EditableField label="USt-Betrag" value={String(d.vatAmount ?? "")} numeric onChange={(v) => setData({ vatAmount: num(v) })} />
          <EditableField label="Brutto" value={String(d.gross ?? "")} numeric onChange={(v) => setData({ gross: num(v) })} />
        </div>
      ) : (
        <div className="card">
          <Field label="Belegtyp" value="Eingangsrechnung" />
          <Field label="Beleg-Nr." value={d.receiptNo ?? "—"} />
          <Field label="Datum" value={formatDate(d.receiptDate)} />
          <Field label="UID" value={d.partnerVatId ?? "—"} />
          <Field label="Netto" value={euro(d.net)} />
          <Field label={`USt (${d.vatRate ?? 0} %)`} value={euro(d.vatAmount)} />
          <Field label="Brutto" value={euro(d.gross)} strong />
        </div>
      )}

      {k && (
        <>
          <h3 className="section-label mt-6">Kontierung</h3>
          {edit ? (
            <>
              <p className="muted" style={{ fontSize: "var(--font-size-sm)", marginBottom: "var(--space-3)" }}>
                Aufwandskonto (Soll) wählen:
              </p>
              {EXPENSE_ACCOUNTS.map((a) => (
                <button
                  key={a.number}
                  className={"account" + (a.number === k.debitAccount ? " is-selected" : "")}
                  onClick={() => setDraft({ ...draft, kontierung: { ...k, debitAccount: a.number } })}
                >
                  <span className="account__num">{a.number}</span>
                  <span className="account__name">{a.name}</span>
                  {a.number === k.debitAccount && <IconCheck size={20} style={{ color: "var(--color-secondary-text)" }} />}
                </button>
              ))}
            </>
          ) : (
            <div className="card">
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
              <p className="muted" style={{ fontSize: "var(--font-size-sm)", marginTop: "var(--space-3)" }}>
                {k.reason}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Field({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="field">
      <span className="field__label">{label}</span>
      <span className="field__value" style={strong ? { fontSize: "var(--font-size-lg)" } : undefined}>
        {value}
      </span>
    </div>
  );
}
