import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const SITE_URL = "https://watchpod.com";
const TITLE = "WatchPod - Find What to Watch Together";
const DESCRIPTION =
  "The one-stop platform to figure out what to watch, with one or many people. Swipe, match, and discover your next favorite movie or show.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "WatchPod",
  keywords: [
    "watchpod",
    "what to watch",
    "movie recommendations",
    "tv recommendations",
    "group movie picker",
    "couples movie night",
    "swipe to match movies",
    "streaming recommendations",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/just_the_logo.png",
    apple: "/just_the_logo.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "WatchPod",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WatchPod - What should we watch tonight?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Deferred-link handoff for iOS.
 *
 * proxy.ts rewrites /collections/<id> and /invite/<code> to this page for iOS
 * visitors without the app, keeping the original URL in the address bar. iOS has
 * no deferred deep linking, so the clipboard is the only carrier that survives
 * the App Store hop: copy the URL when the user taps the store button, and the
 * app offers to paste it back on first launch.
 *
 * Runs as an inline script rather than an onClick because the home page ships a
 * large animation bundle. Before React hydrates, the store link is a plain <a>
 * and a tap would navigate with no copy — a silent, intermittent failure exactly
 * in the case this exists for. A delegated listener in the CAPTURE phase is
 * attached the moment this parses and beats any later React handler.
 *
 * Every path is guarded so a failure still gets the user to the App Store:
 * missing clipboard API (insecure origin), a rejected or hanging promise, or a
 * thrown exception all fall through to the same navigation, exactly once.
 */
const DEFERRED_LINK_SCRIPT = `
(function () {
  var SHARE = /^\\/(collections|invite)\\/[^\\/]/;
  if (!SHARE.test(location.pathname)) return;
  var APP_STORE = "https://apps.apple.com/app/watchpod/id6761643517";
  document.addEventListener("click", function (e) {
    var t = e.target;
    var a = t && t.closest ? t.closest('[data-wp-store="ios"]') : null;
    if (!a) return;
    if (!SHARE.test(location.pathname)) return;
    e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    var url = location.href;
    var done = false;
    function go() { if (done) return; done = true; window.location.href = APP_STORE; }
    try {
      var w = navigator.clipboard && navigator.clipboard.writeText(url);
      if (w && typeof w.then === "function") {
        w.then(go, go);
        setTimeout(go, 1200);
      } else {
        go();
      }
    } catch (err) {
      go();
    }
  }, true);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: DEFERRED_LINK_SCRIPT }} />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
