import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#00f0ff] origin-left z-50 pointer-events-none shadow-[0_0_12px_#00f0ff]"
    />
  );
}
