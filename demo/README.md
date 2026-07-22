# Bookkeeping Clickdummy (Frontend)

Mobile-first Clickdummy im sevDesk-Stil für das Bookkeeping-Tool.
Läuft mit **Mock-Daten** (kein Backend nötig) und ist das Gerüst für das spätere
echte Frontend — später werden die Mock-Daten gegen echte API-Calls getauscht.

**Stack:** Vite + React + TypeScript + react-router-dom. Kein UI-Framework,
Styling über zentrale CSS-Variablen.

## Entwickeln

```bash
npm install
npm run dev -- --host   # Netzwerk-URL im Terminal → am Handy im gleichen WLAN öffnen
```

## Bauen & Hosten

```bash
npm run build           # erzeugt statisches dist/
npm run preview         # dist/ lokal testen
```

`dist/` 1:1 auf die Website legen. Wegen `base: "./"` + HashRouter läuft es auch
in einem Unterordner ohne Server-Rewrites.

## Design / Theming

**Alle** Farben, Radien, Spacing und Schrift liegen zentral in
[`src/styles/theme.css`](src/styles/theme.css) als CSS-Variablen. Farbschema
umstellen (z. B. auf die eigene Marke statt sevDesk-Töne) = Werte dort ändern,
wirkt appweit. Komponenten nutzen nie rohe Hex-Werte.

## Struktur

- `src/screens/` — Screens (Dashboard, Ausgaben, Rechnungen, Bank, Kontakte, Beleg-Detail)
- `src/screens/scan/` — Scan-Flow: Capture → Recognizing → ReviewExtraction → ConfirmBooking → BookingDone
- `src/components/` — BottomNav, BackHeader, EmptyState, Icons
- `src/data/mock.ts` — Mock-Belege, EKR-Konten, Dashboard-Kennzahlen
- `src/types.ts` — Typen, gespiegelt vom Lab-Domänenmodell (`ReceiptData`, `Kontierung`, `Account`)

## Domäne

Kernflow **Beleg → ReceiptData (Erkennung) → Kontierung (Soll/Haben) → EKR-Konto**,
gespiegelt vom Vision-Lab (`../src/main/kotlin/.../model/`). Buchungsregeln:
Eingangsrechnung → Aufwand (Klasse 5–7) an Lieferant (3300);
Ausgangsrechnung → Kunde (2000) an Erlös (Klasse 4).
