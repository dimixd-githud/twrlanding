# TWR Landing V6

Bilingual Next.js landing page for TWR Delver + Command Tower.

## Locales
- `/en`
- `/pt-BR`
- `/` detects `Accept-Language` and redirects to Portuguese when the browser prefers Portuguese, otherwise English.

## V6 changes
- Header navigation: Manifesto / Delver / Command Tower.
- Instagram moved to a compact icon action on the right.
- EN/PT language switch added to the header.
- Full page copy moved into `dictionaries/content.js`.
- Existing hero scroll animation, CRPG manifesto, Jacquard subtitles and media-gallery slots preserved.

## Run
```bash
npm install
npm run dev
```
