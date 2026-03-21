"use client";

import { useWaitlistForm } from "@/hooks/use-waitlist-form";

export function WaitlistCta() {
  const { email, setEmail, submitted, loading, error, handleSubmit } =
    useWaitlistForm("footer");

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noir-800 to-noir-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-coral/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white">
          Ready to find your next watch?
        </h2>
        <p className="mt-4 text-white/40 text-lg">
          Join the waitlist and be the first to know when WatchPod launches.
        </p>

        <div className="mt-8">
          {submitted ? (
            <p className="text-coral text-sm font-medium">
              You&rsquo;re on the list! We&rsquo;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-coral text-white text-sm font-semibold hover:bg-coral-light transition-colors shrink-0 disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          )}
          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
          <p className="mt-3 text-[11px] text-white">
            No spam, no selling your info. Just WatchPod stuff, promise.
          </p>
        </div>
      </div>
    </section>
  );
}
