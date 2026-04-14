export const skillClusters = [
  {
    id: "python",
    name: "Python",
    context: "LangChain, LangGraph, FastAPI",
    children: [
      { name: "RAG", context: "ChromaDB, FAISS" },
      { name: "MCP", context: null },
      { name: "scikit-learn", context: null },
    ],
  },
  {
    id: "java-c",
    name: "Java / C",
    context: "Spring Boot, OpenMP, Systemnah",
    children: [
      { name: "SQL", context: "PostgreSQL" },
      { name: "React", context: "Next.js, Vite" },
      { name: "TypeScript", context: null },
      { name: "Git", context: null },
      { name: "LaTeX", context: null },
    ],
  },
  {
    id: "linux",
    name: "Linux",
    context: "Arch",
    children: [
      { name: "Docker", context: "Docker Compose" },
      { name: "Kubernetes", context: "Grundlagen" },
      { name: "AWS", context: "EC2, S3" },
      { name: "Shell", context: "Bash, PowerShell" },
      { name: "Netzwerk", context: "TCP/IP, DNS, VLANs" },
      { name: "CI/CD", context: null },
    ],
  },
];
