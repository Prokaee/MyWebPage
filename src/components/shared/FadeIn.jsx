import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const offsets = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: -30 },
  };

  const { x, y } = offsets[direction] || offsets.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
