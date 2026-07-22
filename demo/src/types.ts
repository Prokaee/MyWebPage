// Typen gespiegelt vom Lab-Domaenenmodell
// (lab/src/main/kotlin/.../model/ReceiptData.kt, Kontierung.kt + accounts.json),
// ergaenzt um Frontend-Entitaeten (Kontakt, Rechnung) fuer den Clickdummy.
// Betraege als number gehalten; im echten Frontend spaeter Decimal-sicher.

export type ReceiptType =
  | "INCOMING_INVOICE" // Eingangsrechnung (Ausgabe)
  | "OUTGOING_INVOICE" // Ausgangsrechnung (Einnahme)
  | "PAYMENT"
  | "UNKNOWN";

export type BelegStatus = "erkannt" | "gebucht" | "offen";

/** Was eine Strategie vom Beleg gelesen hat (ReceiptData.kt). */
export interface ReceiptData {
  receiptType: ReceiptType;
  receiptNo?: string;
  receiptDate?: string; // ISO
  partnerName?: string;
  partnerVatId?: string; // AT UID "ATU..."
  gross?: number;
  net?: number;
  vatRate?: number;
  vatAmount?: number;
  currency?: string;
  summary?: string;
  confidence?: number; // 0..1
  uncertainties: string[];
}

/** Ein Buchungsvorschlag: Soll an Haben (Kontierung.kt). */
export interface Kontierung {
  debitAccount?: string; // Soll
  creditAccount?: string; // Haben
  reason?: string;
  confidence?: number;
  candidates: string[]; // Kontonummern
}

/** Konto aus dem oesterreichischen EKR (accounts.json). */
export interface Account {
  number: string;
  name: string;
  vatRate: number | null;
}

/** Ein Beleg inkl. erkannter Daten + Buchungsvorschlag. */
export interface Beleg {
  id: string;
  name: string;
  status: BelegStatus;
  data: ReceiptData;
  kontierung?: Kontierung;
}

/** Kunde oder Lieferant. */
export type KontaktTyp = "Kunde" | "Lieferant";

export interface Kontakt {
  id: string;
  name: string;
  typ: KontaktTyp;
  uid?: string;
  email?: string;
}

/** Eine Rechnungsposition. */
export interface Position {
  id: string;
  bezeichnung: string;
  menge: number;
  einzelpreis: number; // netto
  ustSatz: number; // %
}

export type RechnungStatus = "entwurf" | "offen" | "teilbezahlt" | "bezahlt";

/** Eine Ausgangsrechnung. */
export interface Rechnung {
  id: string;
  nummer: string;
  kontaktId?: string;
  datum: string; // ISO
  faelligkeitTage: number;
  positionen: Position[];
  status: RechnungStatus;
}

export type Theme = "light" | "dark";

export interface AppState {
  belege: Beleg[];
  rechnungen: Rechnung[];
  kontakte: Kontakt[];
  settings: { theme: Theme };
  /** Beleg im Scan-Flow, bevor er gebucht wird. */
  draft: Beleg | null;
}
