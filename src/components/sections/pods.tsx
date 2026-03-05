"use client";

import { useRef, useState } from "react";

const POD_MEMBERS = [
  { name: "You", color: "bg-coral" },
  { name: "Alex", color: "bg-steel" },
  { name: "Sam", color: "bg-coral-dark" },
];

const MATCHED_TITLES = [
  "The Grand Budapest Hotel",
  "Inception",
  "Everything Everywhere All at Once",
];

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

          {/* Right: Pod visualization */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Pod card */}
              <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-8">
                {/* Pod header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-noir-800 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coral">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Friday Night Pod</h3>
                    <p className="text-white/30 text-xs">3 members</p>
                  </div>
                </div>

                {/* Members */}
                <div className="flex items-center gap-3 mb-8">
                  {POD_MEMBERS.map((member) => (
                    <div key={member.name} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-bold ring-4 ring-white/20`}
                      >
                        {member.name[0]}
                      </div>
                      <span className="text-white/40 text-[10px]">
                        {member.name}
                      </span>
                    </div>
                  ))}
                  {/* Add member */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full border border-dashed border-white/20 ring-4 ring-white/20 flex items-center justify-center text-white/20 text-lg">
                      +
                    </div>
                    <span className="text-white/20 text-[10px]">Add</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-6" />

                {/* Matches */}
                <p className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-4">
                  3 Matches Found
                </p>
                <div className="space-y-3">
                  {MATCHED_TITLES.map((title) => (
                    <div
                      key={title}
                      className="flex items-center gap-3 p-3 rounded-xl bg-noir-800 border border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-coral">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                      <span className="text-white/70 text-sm truncate">
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
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
