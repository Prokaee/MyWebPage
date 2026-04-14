import { useState, useEffect, lazy, Suspense } from "react";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";

const RagDemo = lazy(() => import("./components/RagDemo/RagDemo"));
const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Timeline = lazy(() => import("./components/Timeline/Timeline"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));

const sectionIds = ["about", "skills", "projects", "timeline", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <ParticleBackground />
      <Nav activeSection={activeSection} />
      <main className="stripe">
        <Hero />
        <Suspense fallback={null}>
          <RagDemo />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
