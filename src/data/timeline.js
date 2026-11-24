import malerei1 from "../assets/malerei1.jpg";
import bachelorAward from "../assets/bachelor-award.jpg";

export const timeline = [
  {
    period: "Nov 2026 – heute",
    title: "Gründer, Kontexo",
    institution: "kontexo.at",
    url: "https://kontexo.at/",
    description:
      "KI, angepasst an eure Firma: eine KI-Plattform für Firmen ab fünf Leuten, mit Wissen aus den eigenen Unterlagen, Agenten, Workflows und Anbindungen an Microsoft 365, Google und FinanzOnline. Aus Tirol, betrieben in der EU.",
    type: "erfahrung",
  },
  {
    period: "Nov 2026",
    title: "Best Bachelor Thesis Award 2025/26",
    institution: "Institut für Informatik, Universität Innsbruck",
    description:
      "Für die beste Bachelorarbeit des Jahres, gemeinsam mit Lucas Griesser: „Automated Support for Scenario-based Testing via MCP-supported Multi-Agent Architecture“.",
    type: "auszeichnung",
    images: [
      { src: bachelorAward, alt: "Urkunde Best Bachelor Thesis Award 2025/26" },
    ],
  },
  {
    period: "Mai 2026 – heute",
    title: "Wissenschaftlicher Mitarbeiter",
    institution: "Universität Innsbruck",
    description:
      "Workshops zu n8n und Workflow-Automatisierung. Konzeption und Durchführung praxisnaher Schulungen für Mitarbeitende und Studierende.",
    type: "erfahrung",
  },
  {
    period: "2023 – heute",
    title: "BSc Informatik",
    institution: "Universität Innsbruck",
    description:
      "Softwareentwicklung, Systemarchitektur, Netzwerktechnik, Datenbanken. Voraussichtlicher Abschluss Juli 2026.",
    type: "ausbildung",
  },
  {
    period: "Feb 2026 – heute",
    title: "Freiberufliche Webentwicklung",
    institution: "Selbstständig",
    description:
      "Deployment-Automatisierung, Docker-basierte Entwicklungsumgebungen, Webanwendungen.",
    type: "erfahrung",
  },
  {
    period: "2025",
    title: "SE-Award – Teamprojekt",
    institution: "Universität Innsbruck",
    description:
      "CI/CD-Setup, Anforderungsanalyse und Schnittstellendesign im 4. Semester.",
    type: "auszeichnung",
  },
  {
    period: "2021 – 2026",
    title: "Gestaltung & Dekorationsmalerei",
    institution: "Freiberuflich / Familienfirma",
    description:
      "Fassadenmalerei, Hotelbeschriftung und Wandmalereien in Tirol.",
    type: "erfahrung",
    images: [
      { src: malerei1, alt: "Fassadenmalerei" },
    ],
  },
  {
    period: "2018 – 2023",
    title: "Studium der Ergotherapie",
    institution: "FH Gesundheit Innsbruck",
    description:
      "Nutzerzentrierte Assessments, ergonomische Anpassungen, interdisziplinäre Teamarbeit. 140 ECTS.",
    type: "ausbildung",
  },
  {
    period: "2017 – 2018",
    title: "Allgemeine Hochschulreife (Matura)",
    institution: "Tagesschule / Selbststudium, Innsbruck",
    description: "Zweiter Bildungsweg.",
    type: "ausbildung",
  },
  {
    period: "2011 – 2016",
    title: "Lehre & Arbeit als Bäcker",
    institution: "Diverse Bäckereien, Tirol",
    description: "Abgeschlossene Lehre und Berufserfahrung.",
    type: "erfahrung",
  },
];
