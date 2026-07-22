import type { Account, Beleg, Kontakt, Position, Rechnung } from "../types";

// EKR-Konten (Auszug), 1:1 aus lab/src/main/resources/accounts.json.
export const ACCOUNTS: Account[] = [
  { number: "2000", name: "Forderungen aus Lieferungen und Leistungen Inland", vatRate: null },
  { number: "2500", name: "Vorsteuer", vatRate: null },
  { number: "2700", name: "Kassa", vatRate: null },
  { number: "2800", name: "Guthaben bei Kreditinstituten", vatRate: null },
  { number: "3300", name: "Verbindlichkeiten aus Lieferungen und Leistungen Inland", vatRate: null },
  { number: "3500", name: "Umsatzsteuer", vatRate: null },
  { number: "4000", name: "Umsatzerlöse 20 % USt", vatRate: 20 },
  { number: "5000", name: "Wareneinsatz", vatRate: 20 },
  { number: "7200", name: "Instandhaltung", vatRate: 20 },
  { number: "7320", name: "Kfz-Aufwand (PKW und Kombis)", vatRate: 20 },
  { number: "7600", name: "Büro- und Drucksorten", vatRate: 20 },
  { number: "7650", name: "Werbung und Repräsentation", vatRate: 20 },
  { number: "7700", name: "Versicherungen", vatRate: 0 },
];

export function accountName(num?: string): string {
  return ACCOUNTS.find((a) => a.number === num)?.name ?? "";
}

// Aufwandskonten fuer die Kontierungs-Auswahl.
export const EXPENSE_ACCOUNTS = ACCOUNTS.filter((a) => a.number.startsWith("5") || a.number.startsWith("7"));

export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "id-" + Math.floor(Math.random() * 1e9).toString(36);
}

export function euro(n?: number): string {
  return (n ?? 0).toLocaleString("de-AT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
}

export function formatDate(iso?: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(2)}`;
}

/** Netto/USt/Brutto einer Rechnung aus ihren Positionen. */
export function rechnungTotals(positionen: Position[]) {
  let net = 0;
  let vat = 0;
  for (const p of positionen) {
    const zeileNet = p.menge * p.einzelpreis;
    net += zeileNet;
    vat += (zeileNet * p.ustSatz) / 100;
  }
  return { net, vat, gross: net + vat };
}

// ---------- Seed-Daten (nur beim allerersten Start) ----------

export const SEED_KONTAKTE: Kontakt[] = [
  { id: "k1", name: "Alpin Software GmbH", typ: "Kunde", uid: "ATU68472013", email: "office@alpin-sw.at" },
  { id: "k2", name: "Café Central OG", typ: "Kunde", uid: "ATU51203344", email: "buchhaltung@cafecentral.at" },
  { id: "k3", name: "OMV Tankstelle Innsbruck", typ: "Lieferant", uid: "ATU37811900" },
  { id: "k4", name: "MediaMarkt Innsbruck", typ: "Lieferant", uid: "ATU56683526" },
];

export const SEED_BELEGE: Beleg[] = [
  {
    id: "b1",
    name: "OMV Tankstelle",
    status: "gebucht",
    data: {
      receiptType: "INCOMING_INVOICE", receiptNo: "2026-1187", receiptDate: "2026-07-18",
      partnerName: "OMV Tankstelle Innsbruck", partnerVatId: "ATU37811900",
      gross: 84.9, net: 70.75, vatRate: 20, vatAmount: 14.15, currency: "EUR",
      summary: "Diesel, 52,3 l", confidence: 0.94, uncertainties: [],
    },
    kontierung: { debitAccount: "7320", creditAccount: "3300", reason: "Eingangsrechnung Treibstoff → Kfz-Aufwand an Lieferant.", confidence: 0.9, candidates: ["7320", "5000", "7200"] },
  },
  {
    id: "b2",
    name: "Mediamarkt",
    status: "erkannt",
    data: {
      receiptType: "INCOMING_INVOICE", receiptNo: "RE-99420", receiptDate: "2026-07-20",
      partnerName: "MediaMarkt Innsbruck", partnerVatId: "ATU56683526",
      gross: 359.0, net: 299.17, vatRate: 20, vatAmount: 59.83, currency: "EUR",
      summary: 'Büromonitor 27"', confidence: 0.88, uncertainties: ["receiptNo unscharf"],
    },
    kontierung: { debitAccount: "7600", creditAccount: "3300", reason: "Büromaterial → Büro- und Drucksorten an Lieferant.", confidence: 0.72, candidates: ["7600", "7200", "5000"] },
  },
  {
    id: "b3",
    name: "Uniqa Versicherung",
    status: "offen",
    data: {
      receiptType: "INCOMING_INVOICE", receiptNo: "POL-2026-334", receiptDate: "2026-07-15",
      partnerName: "UNIQA Österreich", partnerVatId: "ATU15362507",
      gross: 142.3, net: 142.3, vatRate: 0, vatAmount: 0, currency: "EUR",
      summary: "Betriebshaftpflicht Quartal", confidence: 0.81, uncertainties: [],
    },
    kontierung: { debitAccount: "7700", creditAccount: "3300", reason: "Versicherungsprämie → Versicherungen an Lieferant.", confidence: 0.85, candidates: ["7700"] },
  },
];

export const SEED_RECHNUNGEN: Rechnung[] = [
  {
    id: "r1", nummer: "RE-1001", kontaktId: "k1", datum: "2026-07-10", faelligkeitTage: 14, status: "bezahlt",
    positionen: [{ id: "p1", bezeichnung: "Webentwicklung (Std.)", menge: 24, einzelpreis: 95, ustSatz: 20 }],
  },
  {
    id: "r2", nummer: "RE-1002", kontaktId: "k2", datum: "2026-07-16", faelligkeitTage: 14, status: "offen",
    positionen: [
      { id: "p2", bezeichnung: "Wartung Website (Monat)", menge: 1, einzelpreis: 250, ustSatz: 20 },
      { id: "p3", bezeichnung: "Support-Paket", menge: 5, einzelpreis: 60, ustSatz: 20 },
    ],
  },
  {
    id: "r3", nummer: "RE-1003", kontaktId: "k1", datum: "2026-07-05", faelligkeitTage: 7, status: "offen",
    positionen: [{ id: "p4", bezeichnung: "Beratung (Std.)", menge: 6, einzelpreis: 110, ustSatz: 20 }],
  },
];

/** Frischer Scan-Entwurf (Mock-Ergebnis der Vision-Pipeline) mit neuer ID. */
export function makeDraft(): Beleg {
  return {
    id: makeId(),
    name: "SPAR Markt",
    status: "erkannt",
    data: {
      receiptType: "INCOMING_INVOICE", receiptNo: "4471", receiptDate: "2026-07-22",
      partnerName: "SPAR Österreich", partnerVatId: "ATU12345678",
      gross: 27.4, net: 24.91, vatRate: 10, vatAmount: 2.49, currency: "EUR",
      summary: "Bewirtung Team-Meeting", confidence: 0.86,
      uncertainties: ["USt-Satz (10 % oder 20 %) unsicher"],
    },
    kontierung: {
      debitAccount: "7650", creditAccount: "3300",
      reason: "Bewirtung/Repräsentation → Werbung und Repräsentation an Lieferant.",
      confidence: 0.68, candidates: ["7650", "5000", "7600"],
    },
  };
}

/** Naechste Rechnungsnummer aus vorhandenen ableiten. */
export function nextRechnungNr(existing: Rechnung[]): string {
  const nums = existing
    .map((r) => Number(r.nummer.replace(/\D/g, "")))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return `RE-${max + 1}`;
}
