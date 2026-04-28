export const projects = [
  {
    id: "bachelor-thesis",
    year: "2026",
    title: "Multi-Agenten-System",
    description:
      "Bachelorarbeit: Autonome Forschungsagenten mit LangGraph, ChromaDB und MCP. Vergleich monolithischer RAG- vs. MCP-entkoppelter RAG-Architekturen. Dockerisiert, Deployment per Bash-Skripte.",
    tags: ["Python", "LangGraph", "ChromaDB", "MCP", "Docker"],
    link: null,
    featured: true,
  },
  {
    id: "f1-telemetry",
    year: "2026",
    title: "F1 Telemetry Challenge — Lange Nacht der Forschung",
    description:
      "Formula-1-Telemetriesystem basierend auf verteilten Systemen und Cloud Computing. Bei der Langen Nacht der Forschung 2026 als interaktive Challenge live gegangen — Teilnehmende traten um Amazon-Gutscheine an. Entwickelt mit Lucas Griesser und Luca Jenewein, unterstützt durch die DPS-Gruppe der Uni Innsbruck.",
    tags: ["Distributed Systems", "Cloud", "Telemetry", "Python"],
    link: "https://github.com/DukeLuc3010/LNDF_F1_Telemetry",
    featured: true,
  },
  {
    id: "ctm-quizbot",
    year: "2025",
    title: "CTM Quizbot – RAG Q&A",
    description:
      "KI-gestütztes Quizsystem für die Formula Student Community. RAG-Pipeline mit FAISS und Google Gemini für Antworten basierend auf den FS Rules 2025. Vibecoding-Projekt zum Experimentieren mit RAG-Architekturen.",
    tags: ["Python", "RAG", "FAISS", "Gemini", "FastAPI"],
    link: "https://github.com/Prokaee/CTM-Quizbot",
    featured: true,
  },
  {
    id: "groovetrail",
    year: "2025",
    title: "GrooveTrail – Smart Audio System",
    description:
      "Verteiltes Smart-Audio-System für kabellose Musikwiedergabe. Arduino-Sensorstationen kommunizieren via BLE mit Raspberry Pi Access Points, gesteuert über eine Spring Boot + React Web-App. EcoMode via Bewegungsmelder.",
    tags: ["Arduino", "Raspberry Pi", "Python", "React", "Spring Boot", "Docker"],
    link: "https://github.com/Prokaee/g2t1",
    featured: true,
  },
  {
    id: "sign-language",
    year: "2025",
    title: "Gebärdensprache-Klassifikation",
    description:
      "Machine-Learning-Projekt: CNN vs. Random Forest zur Erkennung von Gebärdensprache. Explorative Datenanalyse, Preprocessing-Pipeline und direkter Algorithmenvergleich auf demselben Datensatz.",
    tags: ["Python", "CNN", "scikit-learn", "Jupyter"],
    link: "https://github.com/Prokaee/sign_language_project",
    featured: false,
  },
  {
    id: "innodays",
    year: "2025",
    title: "InnoDays Hackathon – 1. Platz",
    description:
      "Team-Prototyp zur Kristallrückgewinnung mit Bilderkennung und Robotik. 48 Stunden.",
    tags: ["Hackathon", "Computer Vision", "Robotik"],
    link: null,
    featured: true,
  },
  {
    id: "gmail-mcp",
    year: "2025",
    title: "Gmail MCP Server",
    description:
      "MCP-Server zum Versenden von E-Mails über Gmail. OAuth2-Authentifizierung mit automatischem Token-Refresh. Gebaut für die Integration mit Claude Code und anderen MCP-kompatiblen KI-Tools.",
    tags: ["Python", "MCP", "Gmail API", "OAuth2"],
    link: "https://github.com/Prokaee/gmail-mcp-server",
    featured: false,
  },
  {
    id: "clickdummy",
    year: "2026",
    title: "Fußball-Livestream-Plattform",
    description:
      "Interaktiver UI-Prototyp für eine Fußball-Livestreaming-Plattform. Nutzer wechseln zwischen Fan-Kommentatoren bei Regionalliga-Spielen, jeder mit eigenem Live-Chat.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    link: "https://github.com/Prokaee/ClickdummyFinali",
    featured: false,
  },
  {
    id: "portfolio",
    year: "2026",
    title: "Portfolio Website",
    description:
      "Diese Seite. Minimales Schwarz-Weiß-Design, datengetriebene Architektur, Scroll-Animationen. Deployed mit Vercel + Cloudfront.",
    tags: ["React", "Vite", "Framer Motion", "Raspberry Pi"],
    link: "https://github.com/Prokaee/MyWebPage",
    featured: false,
  },
];
