# TWR Landing V1

A small Next.js landing page for TWR Delver + Command Tower.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Hero scroll behavior

The hero video is scrubbed by page scroll instead of autoplaying. The page automatically switches between:

- `/public/assets/hero-desktop.mp4`
- `/public/assets/hero-mobile.mp4`

The hero section is intentionally taller than the viewport, while the visual stays sticky. Scroll progress across that section is mapped to the video's `currentTime`.

### Production tip

For even smoother seeking, re-encode the hero videos with frequent keyframes or all-intra frames. The current MP4s work, but browser seeking quality depends on the source GOP structure and device.

## Replace launch links

The first version uses `href="#"` for external actions. Replace these with the final URLs for:

- Delver on Vercel
- Command Tower download
- Instagram

## Included assets

The project includes the TWR logos, hero videos/posters, and two existing pixel-art artworks as temporary product visuals.

## V2 interaction notes

- Hero headline, supporting copy and CTAs now reveal progressively from scroll progress.
- A manifesto / CRPG-dialog section now sits between the hero and Delver.
- The manifesto uses `/public/assets/manifesto-dungeon.png` as its dungeon backdrop.
- Replace the temporary files in `/public/assets/icons/` with the final 64x64 transparent pixel-art icons using the same filenames:
  - `scroll.png`
  - `backpack.png`
  - `wand.png`
  - `sword-shield.png`
