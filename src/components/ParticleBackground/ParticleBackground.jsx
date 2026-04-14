import { useEffect, useRef, useState } from "react";
import styles from "./ParticleBackground.module.css";

const PARTICLE_COUNT = 200;
const CONNECT_DISTANCE = 300;
const MOUSE_RADIUS = 100;
const REPEL_STRENGTH = 0.0008;
const SIZE = 3;
const MOBILE_BREAKPOINT = 768;

function isMobileDevice() {
  const narrowScreen = window.innerWidth < MOBILE_BREAKPOINT;
  const touchOnly = "ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches;
  return narrowScreen || touchOnly;
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const [hidden, setHidden] = useState(isMobileDevice);

  useEffect(() => {
    const check = () => setHidden(isMobileDevice());
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (hidden) return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: -1000, y: -1000 };

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      baseVx: (Math.random() - 0.5) * 0.15,
      baseVy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * SIZE + 1,
      opacity: Math.random() * 0.3 + 0.08,
    }));

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * REPEL_STRENGTH;
          p.vx -= dx * force;
          p.vy -= dy * force;
        }

        p.vx += (p.baseVx - p.vx) * 0.008;
        p.vy += (p.baseVy - p.vy) * 0.008;

        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w();
        if (p.x > w()) p.x = 0;
        if (p.y < 0) p.y = h();
        if (p.y > h()) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const isLight = document.documentElement.classList.contains("light");
        const c = isLight ? "30, 30, 30" : "229, 229, 229";
        ctx.fillStyle = `rgba(${c}, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const isL = document.documentElement.classList.contains("light");
            const cl = isL ? "30, 30, 30" : "229, 229, 229";
            ctx.strokeStyle = `rgba(${cl}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
