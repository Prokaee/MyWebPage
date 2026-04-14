export const skillClusters = [
  {
    id: "java-c",
    name: "Java / C",
    context: "Spring, Pthreads, OpenMP, Systemnah",
    children: [
      { name: "SQL", context: null },
      { name: "React", context: null },
      { name: "Git", context: null },
      { name: "LaTeX", context: null },
    ],
  },
  {
    id: "python",
    name: "Python",
    context: "LangChain, LangGraph",
    children: [
      { name: "RAG", context: "Bachelorarbeit" },
      { name: "MCP", context: null },
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
