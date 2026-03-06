"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function Pods() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen flex flex-col justify-center py-32 md:py-40 overflow-hidden"
    >
      {/* Mouse-tracking aura for entire section */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(248,152,128,0.12), rgba(74,111,165,0.06), transparent 70%)`
            : "none",
        }}
      />

      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-coral text-sm uppercase tracking-[0.2em] mb-4 font-medium">
              Pods
            </p>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Your crew,<br />your matches
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              A Pod is your watch group. Everyone swipes independently,
              and when tastes align, the matches appear. Simple, fair, and
              no more &ldquo;I don&rsquo;t care, you pick&rdquo; conversations.
            </p>
            <div className="flex items-center gap-4 text-white/30 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-steel" />
                Invite anyone
              </span>
            </div>
          </div>

          {/* Right: Real screenshot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image
                  src="/actual_screenshot.jpg"
                  alt="WatchPod app screenshot showing a Pod with matches"
                  width={400}
                  height={800}
                  className="w-full h-auto"
                />
              </div>

              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-coral/5 blur-3xl rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
