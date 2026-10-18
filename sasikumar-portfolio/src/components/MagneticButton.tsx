import React, { useRef, useState, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  download?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 25,
  onClick,
  href,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);

    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-block">
      {content}
    </div>
  );
}
