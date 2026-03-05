"use client";

import { useRef, useState, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl p-px overflow-hidden ${className}`}
    >
      {/* Card background */}
      <div className="absolute inset-px rounded-[15px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/10" />

      {/* Animated glow that follows mouse - sits between bg and content */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, rgba(248,152,128,0.25), rgba(74,111,165,0.1), transparent 70%)`
            : "none",
        }}
      />

      {/* Card content - on top, blocks the glow */}
      <div className="relative h-full rounded-[15px] p-8">
        {children}
      </div>
    </div>
  );
}
