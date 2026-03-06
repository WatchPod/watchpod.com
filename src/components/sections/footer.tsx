import Image from "next/image";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pods", href: "#pods" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "feedback@watchpod.com", href: "mailto:feedback@watchpod.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.svg"
              alt="WatchPod"
              width={120}
              height={28}
              className="mb-4"
            />
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The easiest way to figure out what to watch with the people you
              love.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white/60 text-xs uppercase tracking-[0.15em] mb-4 font-medium">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/30 hover:text-coral text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center">
          <p className="text-white/20 text-xs">
            {new Date().getFullYear()} WatchPod. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
