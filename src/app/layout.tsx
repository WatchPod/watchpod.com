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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
