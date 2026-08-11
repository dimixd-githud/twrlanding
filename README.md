# TWR Landing V7 patch

Replace/add these files preserving paths:

- `app/[lang]/page.jsx`
- `app/globals.css`
- `public/assets/delver-mimic.png`
- `public/assets/command-palantir.png`

V7 changes:
- Delver and Command Tower product intros are full-bleed illustrated sections with copy over the artwork.
- Existing feature grids and 5-slot media galleries remain below each full-bleed intro.
- Main landing sections use gentle CSS scroll snapping (`y proximity`) rather than JavaScript scroll locking.
