import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const logoSvg = readFileSync(resolve(root, "public/logo.svg"), "utf-8");

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glowCoral" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#F89880" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#F89880" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowSteel" cx="10%" cy="90%" r="55%">
      <stop offset="0%" stop-color="#4A6FA5" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#4A6FA5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B0D12"/>
      <stop offset="100%" stop-color="#11141B"/>
    </linearGradient>
    <style>
      .title {
        font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
        font-weight: 700;
        font-size: 88px;
        letter-spacing: -2px;
      }
      .url {
        font-family: "Inter", system-ui, sans-serif;
        font-weight: 500;
        font-size: 22px;
        letter-spacing: 4px;
        text-transform: uppercase;
      }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glowCoral)"/>
  <rect width="${W}" height="${H}" fill="url(#glowSteel)"/>

  <!-- Logo wordmark, centered horizontally, upper area -->
  <g transform="translate(${(W - 350) / 2}, 100) scale(2)">
    ${logoSvg
      .trim()
      .replace(/^<svg[^>]*>/, "")
      .replace(/<\/svg>\s*$/, "")}
  </g>

  <!-- Headline (two lines, matching hero) -->
  <text x="${W / 2}" y="360" text-anchor="middle" class="title" fill="#FFFFFF">
    What should
  </text>
  <text x="${W / 2}" y="460" text-anchor="middle" class="title" fill="#FFFFFF">
    <tspan fill="#F89880">we</tspan> watch tonight?
  </text>

  <!-- URL strip -->
  <text x="${W / 2}" y="565" text-anchor="middle" class="url" fill="#FFFFFF" fill-opacity="0.45">
    watchpod.com
  </text>

  <!-- Bottom hairline divider -->
  <line x1="${W / 2 - 80}" y1="595" x2="${W / 2 + 80}" y2="595"
    stroke="#F89880" stroke-opacity="0.4" stroke-width="1"/>
</svg>
`;

const outPath = resolve(root, "public/og-image.png");
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
