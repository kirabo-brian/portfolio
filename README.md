# React + Vite

## Images and performance

Keep original artwork in `src/assets/gallery`. `npm run dev` and `npm run build`
automatically generate cached 480px/960px WebP previews in `src/assets/previews`.
The generated directory is ignored by Git and rebuilt on a fresh checkout.
Run `npm run optimize:images` (or restart the dev server) after adding/changing images
during development. Original files are never overwritten; lightboxes retain them.
Animated GIFs receive still thumbnails and animate when opened.

Decorative video previews load only when visible at viewport widths of at least
768px, with reduced motion and data saving disabled. They pause in hidden tabs
and offscreen. Phones use posters and a static dark-blue background; selected
videos can still be played in the media viewer.

Gallery and Contact JavaScript load on demand. For production browser checks,
run `npm run build` then `npm run test:browser` (requires installed Google Chrome).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
