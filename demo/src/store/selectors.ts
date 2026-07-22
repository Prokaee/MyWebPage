import type { AppState, Rechnung } from "../types";
import { rechnungTotals } from "../data/seed";

const MONTHS_DE = ["Jän", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"];

export function rechnungGross(r: Rechnung): number {
  return rechnungTotals(r.positionen).gross;
}

function dueDate(r: Rechnung): Date {
  const d = new Date(r.datum);
  d.setDate(d.getDate() + r.faelligkeitTage);
  return d;
}

export interface DashboardMetrics {
  income: number;
  expenses: number;
  profitBeforeTax: number;
  outstandingTotal: number;
  outstanding: {
    faellig: { count: number; amount: number };
    offen: { count: number; amount: number };
    teilbezahlt: { count: number; amount: number };
  };
  chart: { month: string; income: number; expense: number; incomeVal: number; expenseVal: number }[];
}

export function dashboardMetrics(state: AppState): DashboardMetrics {
  const now = new Date();

  const expenses = state.belege.reduce((s, b) => s + (b.data.gross ?? 0), 0);
  const income = state.rechnungen
    .filter((r) => r.status === "bezahlt")
    .reduce((s, r) => s + rechnungGross(r), 0);

  const unpaid = state.rechnungen.filter((r) => r.status === "offen" || r.status === "teilbezahlt");
  const outstandingTotal = unpaid.reduce((s, r) => s + rechnungGross(r), 0);

  const faellig = unpaid.filter((r) => r.status === "offen" && dueDate(r) < now);
  const offen = unpaid.filter((r) => r.status === "offen" && dueDate(r) >= now);
  const teil = unpaid.filter((r) => r.status === "teilbezahlt");
  const sum = (arr: Rechnung[]) => arr.reduce((s, r) => s + rechnungGross(r), 0);

  // Chart: letzte 4 Monate relativ zu heute.
  const buckets: { key: string; label: string; income: number; expense: number }[] = [];
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTHS_DE[d.getMonth()], income: 0, expense: 0 });
  }
  const bucketOf = (iso?: string) => {
    if (!iso) return undefined;
    const d = new Date(iso);
    return buckets.find((b) => b.key === `${d.getFullYear()}-${d.getMonth()}`);
  };
  for (const r of state.rechnungen) {
    if (r.status !== "bezahlt") continue;
    const b = bucketOf(r.datum);
    if (b) b.income += rechnungGross(r);
  }
  for (const bl of state.belege) {
    const b = bucketOf(bl.data.receiptDate);
    if (b) b.expense += bl.data.gross ?? 0;
  }

  const max = Math.max(1, ...buckets.flatMap((b) => [b.income, b.expense]));
  const chart = buckets.map((b) => ({
    month: b.label,
    income: b.income / max,
    expense: b.expense / max,
    incomeVal: b.income,
    expenseVal: b.expense,
  }));

  return {
    income,
    expenses,
    profitBeforeTax: income - expenses,
    outstandingTotal,
    outstanding: {
      faellig: { count: faellig.length, amount: sum(faellig) },
      offen: { count: offen.length, amount: sum(offen) },
      teilbezahlt: { count: teil.length, amount: sum(teil) },
    },
    chart,
  };
}
