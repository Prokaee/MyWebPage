# Clickdummy-Demo unter `/demo`

Der Buchhaltungs-Clickdummy liegt als eigenständige Mini-App in [`demo/`](demo/) und wird
beim Build nach [`public/demo/`](public/demo/) geschrieben → erreichbar unter
`https://michaelprokop.at/demo`.

Die Demo ist **öffentlich**, genau wie der Rest der Seite — kein Login, kein Passwort.
Einfach den Link aufmachen oder weitergeben.

> Früher lag hier eine `middleware.js` mit HTTP-Basic-Auth. Die ist entfernt; die
> Umgebungsvariablen `DEMO_USER` / `DEMO_PASS` in den Vercel-Projekteinstellungen
> werden nicht mehr gelesen und können dort gelöscht werden.

## Demo aktualisieren (nach Änderungen am Clickdummy)

```bash
cd demo
npm install        # nur beim ersten Mal
npm run build      # -> schreibt nach ../public/demo
```

Danach `public/demo/` committen und pushen — Vercel deployt automatisch neu.
Lokal testen: `cd demo && npm run dev` → http://localhost:4321/

## URL ändern

Der Pfad steckt an zwei Stellen: `base: "/demo/"` in [`demo/vite.config.ts`](demo/vite.config.ts)
und dem Ordnernamen unter `outDir`. Für z. B. `/buchhaltung` beides auf
`"/buchhaltung/"` bzw. `../public/buchhaltung` setzen und neu bauen — die App selbst
nutzt HashRouter und läuft dadurch in jedem Unterordner ohne Server-Rewrites.

## Hosting auf Raspberry Pi + Caddy

Statisches Ausliefern reicht, nichts Spezielles nötig:

```caddy
michaelprokop.at {
    root * /var/www/portfolio/dist
    encode gzip
    file_server
    try_files {path} /index.html
}
```
