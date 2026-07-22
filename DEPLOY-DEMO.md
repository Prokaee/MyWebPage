# Clickdummy-Demo unter `/demo` (passwortgeschützt)

Der Buchhaltungs-Clickdummy liegt als eigenständige Mini-App in [`demo/`](demo/) und wird
beim Build nach [`public/demo/`](public/demo/) geschrieben → erreichbar unter
`https://michaelprokop.at/demo`. Der Rest der Seite bleibt **öffentlich**; nur `/demo`
ist per **HTTP-Basic-Auth** geschützt.

## Zugangsdaten setzen (einmalig)

Die Login-Daten liegen als Environment-Variablen, **nicht im Code**:

| Variable    | Bedeutung        |
| ----------- | ---------------- |
| `DEMO_USER` | Benutzername     |
| `DEMO_PASS` | Passwort         |

### Auf Vercel
1. Repo muss mit Vercel verbunden sein (Git-Integration).
2. **Project Settings → Environment Variables** → `DEMO_USER` und `DEMO_PASS` anlegen
   (für *Production* und *Preview*).
3. Neu deployen (Git-Push). Die Datei [`middleware.js`](middleware.js) läuft dann auf
   Vercels Edge und fragt für `/demo` den Login ab — ohne korrekte Daten kommt `401`,
   die Seite wird gar nicht erst ausgeliefert. Der Rest der Domain bleibt offen.

Link zum Teilen: `https://michaelprokop.at/demo` → Kollegen bekommen ein Login-Popup.

## Demo aktualisieren (nach Änderungen am Clickdummy)

```bash
cd demo
npm install        # nur beim ersten Mal
npm run build      # -> schreibt nach ../public/demo
```

Danach `public/demo/` committen und pushen — Vercel deployt automatisch neu.
Lokal testen: `cd demo && npm run dev` → http://localhost:4321/

## Fallback: Hosting auf Raspberry Pi + Caddy

`middleware.js` ist **Vercel-spezifisch** (auf dem Pi wird sie einfach ignoriert, schadet nicht).
Wenn die Seite über Caddy läuft, den Schutz stattdessen im `Caddyfile` setzen:

```caddy
michaelprokop.at {
    root * /var/www/portfolio/dist
    encode gzip

    @demo path /demo /demo/*
    basic_auth @demo {
        michael <BCRYPT-HASH>
    }

    file_server
    try_files {path} /index.html
}
```

Hash erzeugen mit:

```bash
caddy hash-password --plaintext 'DEIN_PASSWORT'
```

> Basic-Auth ist nur über HTTPS sicher — Vercel und Caddy liefern beide HTTPS, passt also.
> Für „nur eingeladene Kollegen sollen den Prototyp sehen" ist das genau richtig.
