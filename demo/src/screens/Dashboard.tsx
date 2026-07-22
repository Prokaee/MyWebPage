import { useNavigate } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { dashboardMetrics } from "../store/selectors";
import { euro } from "../data/seed";
import Chart from "../components/Chart";
import ThemeToggle from "../components/ThemeToggle";
import { IconEye, IconScan, IconPlus, IconChevronDown } from "../components/icons";

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useApp();
  const m = dashboardMetrics(state);
  const user = "Michi";

  return (
    <div className="screen">
      {/* Profil-Header */}
      <div className="topbar">
        <div className="profile">
          <div className="avatar">{user.charAt(0)}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{user}</div>
            <div className="muted" style={{ fontSize: "var(--font-size-sm)" }}>Einzelunternehmen</div>
          </div>
        </div>
        <div className="topbar__actions">
          <button className="iconbtn" aria-label="Beträge ausblenden"><IconEye size={22} /></button>
          <ThemeToggle />
        </div>
      </div>

      {/* Gewinn-vor-Steuern-Karte */}
      <div className="card">
        <div className="profit-card__head">
          <div>
            <div className="muted" style={{ marginBottom: 4 }}>Gewinn vor Steuern</div>
            <div className="big-amount">{euro(m.profitBeforeTax)}</div>
          </div>
          <div className="stack-sm" style={{ textAlign: "right" }}>
            <div>
              <div className="legend" style={{ justifyContent: "flex-end" }}>
                <span className="legend__dot" style={{ background: "var(--color-income)" }} />
                Einnahmen
              </div>
              <div className="amount">{euro(m.income)}</div>
            </div>
            <div>
              <div className="legend" style={{ justifyContent: "flex-end" }}>
                <span className="legend__dot" style={{ background: "var(--color-expense)" }} />
                Ausgaben
              </div>
              <div className="amount">{euro(m.expenses)}</div>
            </div>
          </div>
        </div>

        <Chart data={m.chart} />

        <div className="range-toggle">
          Letzte 4 Monate <IconChevronDown size={16} style={{ verticalAlign: "middle" }} />
        </div>
      </div>

      {/* Ausstehende Rechnungen */}
      <h2 className="section-label mt-6">Ausstehende Rechnungen</h2>
      <div className="card card--muted" style={{ marginBottom: "var(--space-4)" }}>
        <div className="muted" style={{ marginBottom: 4 }}>Ausstehender Betrag</div>
        <div className="amount">{euro(m.outstandingTotal)}</div>
      </div>

      <div className="card">
        <StatRow count={m.outstanding.faellig.count} label="Fällig" amount={m.outstanding.faellig.amount} tone="danger" />
        <StatRow count={m.outstanding.offen.count} label="Offen" amount={m.outstanding.offen.amount} tone="neutral" />
        <StatRow count={m.outstanding.teilbezahlt.count} label="Teilbezahlt" amount={m.outstanding.teilbezahlt.amount} tone="neutral" />
      </div>

      {/* FAB: Scan + Neu */}
      <div className="fab-wrap">
        <button className="fab" aria-label="Beleg scannen" onClick={() => navigate("/scan")}>
          <IconScan size={24} />
        </button>
        <button className="fab fab--primary" aria-label="Neue Rechnung" onClick={() => navigate("/rechnungen/neu")}>
          <IconPlus size={24} />
        </button>
      </div>
    </div>
  );
}

function StatRow({
  count,
  label,
  amount,
  tone,
}: {
  count: number;
  label: string;
  amount: number;
  tone: "danger" | "neutral";
}) {
  return (
    <div className="stat-row">
      <div className="stat-row__label">
        <span className="stat-row__count">{count}</span>
        <span style={{ fontWeight: 600 }}>{label}</span>
      </div>
      <span className={tone === "danger" && amount > 0 ? "badge badge--danger" : "badge badge--neutral"}>
        {euro(amount)}
      </span>
    </div>
  );
}
