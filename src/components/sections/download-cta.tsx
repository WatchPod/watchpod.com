import { StoreButtons } from "@/components/ui/store-buttons";

export function DownloadCta() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noir-800 to-noir-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-coral/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white">
          Ready to find your next watch?
        </h2>
        <p className="mt-4 text-white/40 text-lg">
          Download WatchPod and start discovering what everyone actually wants
          to watch.
        </p>

        <div className="mt-8">
          <StoreButtons />
        </div>
      </div>
    </section>
  );
}
