"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  const titleLine1 = "What should";
  const titleLine2Words = [
    { text: "we", color: "text-white" },
    { text: "watch", color: "text-coral" },
    { text: "tonight?", color: "text-white" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-noir-900 to-noir-800" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-coral/8 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-steel/8 blur-[120px] animate-pulse-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-coral/3 blur-[200px]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Animated floating paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Image
              src="/just_the_logo.png"
              alt=""
              width={80}
              height={80}
              className="animate-float"
              priority
            />
            <div className="absolute inset-0 bg-coral/20 blur-2xl rounded-full" />
          </div>
        </motion.div>

        {/* Headline with animated letters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="font-[family-name:var(--font-space)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="block">
              {titleLine1.split("").map((letter, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block text-white"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
            <span className="block">
              {titleLine2Words.map((word, wordIndex) => {
                const charOffset = titleLine2Words
                  .slice(0, wordIndex)
                  .reduce((sum, w) => sum + w.text.length + 1, 0);
                return (
                  <span key={wordIndex} className="inline-block mr-[0.25em] last:mr-0">
                    {word.text.split("").map((letter, i) => (
                      <motion.span
                        key={`l2-${charOffset + i}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.6 + (charOffset + i) * 0.03,
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                        }}
                        className={`inline-block ${word.color}`}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                );
              })}
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 md:mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-noir-900/40 rounded-2xl px-6 py-4"
        >
          WatchPod takes the stress out of choosing.
          Swipe on movies and shows you love, connect with your crew,
          and instantly discover what everyone wants to watch.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <a
            href="#how-it-works"
            className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-coral transition-colors"
            aria-label="Scroll to learn more"
          >
            <span className="text-xs uppercase tracking-[0.2em]">Discover</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="animate-bounce"
            >
              <path d="M10 4v12M4 10l6 6 6-6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
