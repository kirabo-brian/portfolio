# React + Vite

## Images and performance

Keep original artwork in `src/assets/gallery`. `npm run dev` and `npm run build`
automatically generate cached 480px/960px WebP artwork previews and cropped
240px/480px/720px collection covers in `src/assets/previews`.
The generated directory is ignored by Git and rebuilt on a fresh checkout.
Run `npm run optimize:media` (or restart the dev server) after adding/changing media
during development. Original files are never overwritten; lightboxes retain them.
Animated GIFs receive still thumbnails and animate when opened.

Decorative video previews load only when visible at viewport widths of at least
768px **and** the primary pointer supports fine pointing and hover, with reduced
motion and data saving disabled. Touch phones keep posters in either orientation.
Build/startup generates cached silent, eight-second H.264 preview clips in
`src/assets/video-previews` (640px for cards, 1280px for the background).
Previews pause in hidden tabs and offscreen. Original videos remain available in
the media viewer and are never overwritten. The FFmpeg build tool is downloaded
as a platform-specific npm dependency during `npm install` / `npm ci`.
If needed, set `FFMPEG_PATH` to an existing FFmpeg executable with the `libx264`
encoder. The first media build takes longer; unchanged previews are cached.

Gallery and Contact JavaScript load on demand. For production browser checks,
run `npm run build` then `npm run test:browser` (requires installed Google Chrome).

Gallery viewers are loaded on first use. Dialogs support focus trapping, Escape,
focus restoration and keyboard-operable cards. `npm run build` also writes static
route-specific HTML metadata for `/gallery` and `/contact`; Vercel rewrites serve
these pages directly. `public/robots.txt` permits crawling. The generated social
image is `public/social-card.jpg`; add a canonical deployment URL and absolute
social-image URLs when the final public domain is configured.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
