# michaelprokop.dev

Personal portfolio website — black & white, minimal, editorial.

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

Static output goes to `dist/`. Serve it with any web server (Caddy, Nginx, etc.).

## Project Structure

```
src/
├── data/                  # Content lives here — edit these to update the site
│   ├── meta.js            # Name, tagline, email, social links, status message
│   ├── projects.js        # Project entries (add new ones here)
│   ├── skills.js          # Skills grid data
│   └── timeline.js        # CV timeline (education, experience, achievements)
├── components/
│   ├── Nav/               # Fixed top nav with scroll blur + mobile hamburger
│   ├── Hero/              # Full-viewport intro with animated name
│   ├── About/             # Bio + quick facts sidebar
│   ├── Skills/            # Bento grid layout
│   ├── Projects/          # Data-driven project list
│   ├── Timeline/          # Vertical CV timeline
│   ├── Contact/           # Email + social links
│   ├── Footer/            # Minimal footer
│   └── shared/            # Reusable components (FadeIn, SectionHeading, StatusIndicator)
├── App.jsx                # Root component, section scroll tracking
├── main.jsx               # Entry point
└── index.css              # Global styles, CSS variables, fonts, grain overlay
```

## Adding a New Project

Edit `src/data/projects.js` and add an object to the array:

```js
{
  id: "my-project",
  year: "2026",
  title: "Project Name",
  description: "One or two sentences about the project.",
  tags: ["React", "Docker"],
  link: "https://github.com/...",  // or null
  featured: true,                   // bold title treatment
}
```

No component changes needed.

## Tech Stack

- **React** + **Vite** — fast dev & builds
- **CSS Modules** — scoped styles, zero dependencies
- **Framer Motion** — scroll reveals and hero animation
- **Inter + JetBrains Mono** — Google Fonts

## Deployment (Raspberry Pi)

1. Build locally: `npm run build`
2. Copy `dist/` to your Pi
3. Serve with Caddy:

```
yourdomain.dev {
    root * /var/www/portfolio/dist
    file_server
    encode gzip
    try_files {path} /index.html
}
```
