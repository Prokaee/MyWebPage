import { useState, useEffect } from "react";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";
import RagDemo from "./components/RagDemo/RagDemo";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Timeline from "./components/Timeline/Timeline";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

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
        <RagDemo />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
      </main>
      <Footer />
    </>
  );
}
