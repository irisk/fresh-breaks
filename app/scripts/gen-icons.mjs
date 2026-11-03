// Generates PNG icon fallbacks from public/mark.svg.
// One-shot: run after the brand mark changes, then commit the outputs.
//
//   npm run gen:icons
//
// Outputs (overwrites):
//   public/apple-touch-icon.png   180×180  (iOS home-screen icon)
//   public/icon-192.png           192×192  (PWA standard)
//   public/icon-512.png           512×512  (PWA standard)
//   public/icon-512-maskable.png  512×512  (Android adaptive, ~20% safe-zone padding)

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const svg = readFileSync(resolve(publicDir, 'mark.svg'));

async function render(size, outName) {
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer();
  writeFileSync(resolve(publicDir, outName), buf);
  console.log(`  ✓ ${outName} (${size}×${size})`);
}

async function renderMaskable(size, outName) {
  // Adaptive icons crop to a 80%-diameter circle inside the canvas.
  // Pad the mark to ~60% of the canvas so it sits comfortably inside the safe zone.
  const inner = Math.round(size * 0.6);
  const inset = Math.round((size - inner) / 2);
  const markBuf = await sharp(svg, { density: 384 }).resize(inner, inner).png().toBuffer();
  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: markBuf, top: inset, left: inset }])
    .png()
    .toBuffer();
  writeFileSync(resolve(publicDir, outName), buf);
  console.log(`  ✓ ${outName} (${size}×${size}, maskable safe-zone)`);
}

console.log('Generating Fresh Breaks icons from public/mark.svg…');
await render(180, 'apple-touch-icon.png');
await render(192, 'icon-192.png');
await render(512, 'icon-512.png');
await renderMaskable(512, 'icon-512-maskable.png');
console.log('Done.');
