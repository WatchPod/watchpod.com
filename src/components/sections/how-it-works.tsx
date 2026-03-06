import { Particles } from "@/components/ui/particles";
import { GlowCard } from "@/components/ui/glow-card";

const STEPS = [
  {
    number: "01",
    title: "Swipe",
    description:
      "Browse through movies and TV shows, swiping right on anything that catches your eye. Build your personal watchlist effortlessly.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="1" width="14" height="22" rx="3" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Pod Up",
    description:
      "Create a Pod with friends, family, or your significant other. Everyone swipes independently on their own time.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Match",
    description:
      "When everyone in your Pod has swiped right on the same title, it surfaces as a match. No more endless debates.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-32 md:py-40 overflow-hidden">
      {/* Particle background */}
      <Particles count={70} color="255,210,80" size={0.75} />

      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-coral text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            How It Works
          </p>
          <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white tracking-tight">
            Three steps to your next watch
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {STEPS.map((step) => (
            <GlowCard key={step.number}>
              {/* Step number */}
              <span className="text-coral/30 font-[family-name:var(--font-space)] text-6xl font-bold absolute top-4 right-6">
                {step.number}
              </span>

              {/* Icon */}
              <div className="mb-6 text-coral">{step.icon}</div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {step.description}
              </p>
            </GlowCard>
          ))}
        </div>

        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-[calc(50%+40px)] left-[calc(33.33%-10px)] right-[calc(33.33%-10px)] h-px">
          <div className="w-full h-full bg-gradient-to-r from-coral/10 via-coral/20 to-coral/10" />
        </div>
      </div>
    </section>
  );
}
