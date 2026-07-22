import { IconSearch } from "../components/icons";

const BANKS = ["N26", "PayPal", "FYRST", "bunq", "Sparkasse", "DB", "VR", "Commerzbank"];

export default function Bank() {
  return (
    <div className="screen" style={{ display: "flex", flexDirection: "column" }}>
      <h1 className="page-title" style={{ marginBottom: "var(--space-4)" }}>Bank verbinden</h1>
      <p className="muted" style={{ lineHeight: 1.5 }}>
        Mehr Überblick, weniger Aufwand: Rechnungen direkt zahlen, Ausgaben
        sofort zuordnen und offene Zahlungen einfacher im Blick behalten.
      </p>

      <div className="search">
        <IconSearch size={20} /> Bank suchen
      </div>

      <div className="bank-grid">
        {BANKS.map((b) => (
          <div key={b} className="bank-logo">{b}</div>
        ))}
      </div>
      <p className="muted">4.000+ unterstützte Banken</p>

      <button className="btn btn--primary" style={{ marginTop: "auto" }}>
        Konto verbinden
      </button>
    </div>
  );
}
