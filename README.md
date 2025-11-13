# Project Name

Professional frontend application built with Vite + React and Tailwind CSS. Uses modular components, animations, and Firebase integration. Deploys to Vercel.

## 🌐 Live Demo

Here are the connected frontend deployments using this backend:

- 🔗 **Netlify:** [https://celadon-valkyrie-8f556f.netlify.app/](https://celadon-valkyrie-8f556f.netlify.app/)
- 🔗 **Vercel:** [https://homenest-client-seven.vercel.app/](https://homenest-client-seven.vercel.app/)
- 🔗 **Surge:** [http://vagabond-water.surge.sh/](http://vagabond-water.surge.sh/)

## Quick links

- Entry: [`index.html`](index.html)
- App component: [`App`](src/App.jsx) — [src/App.jsx](src/App.jsx)
- Boot/renderer: [`main`](src/main.jsx) — [src/main.jsx](src/main.jsx)
- Styles: [`index.css`](src/index.css) — [src/index.css](src/index.css)
- Project config: [`package.json`](package.json) — [package.json](package.json)
- Vite config: [`vite.config.js`](vite.config.js) — [vite.config.js](vite.config.js)
- Tailwind config: [`tailwind.config.js`](tailwind.config.js) — [tailwind.config.js](tailwind.config.js)
- PostCSS: [`postcss.config.js`](postcss.config.js) — [postcss.config.js](postcss.config.js)
- ESLint: [`eslint.config.js`](eslint.config.js) — [eslint.config.js](eslint.config.js)
- Vercel config: [`vercel.json`](vercel.json) — [vercel.json](vercel.json)
- Vercel project meta: [`.vercel/project.json`](.vercel/project.json) — [.vercel/project.json](.vercel/project.json)

## Features

- Component-driven UI with reusable components (examples in [src/components/](src/components/))
  - [`Header`](src/components/Header/) — [src/components/Header/](src/components/Header/)
  - [`Footer`](src/components/Footer/) — [src/components/Footer/](src/components/Footer/)
  - [`Slider`](src/components/Slider/) — [src/components/Slider/](src/components/Slider/)
  - [`FeaturedProperties`](src/components/FeaturedProperties/) — [src/components/FeaturedProperties/](src/components/FeaturedProperties/)
  - [`BackToTop`](src/components/BackToTop/) — [src/components/BackToTop/](src/components/BackToTop/)
- Page structure and routing in [src/pages/](src/pages/) and [src/routes/](src/routes/) — [src/pages/](src/pages/) / [src/routes/](src/routes/)
- Layout primitives in [src/Layout/](src/Layout/) — [src/Layout/](src/Layout/)
- Global state / context in [src/Context/](src/Context/) — [src/Context/](src/Context/)
- Firebase integration (auth / db) in [src/firebase/](src/firebase/) — [src/firebase/](src/firebase/)
- Lottie animations under [src/Animation/](src/Animation/) (examples: [`404.json`](src/Animation/404.json), [`loginAnimation.json`](src/Animation/loginAnimation.json)) — [src/Animation/](src/Animation/)
- Static assets and public redirects in [public/](public/) — [public/\_redirects](public/_redirects)

## Technologies

- React (JSX) — entry at [`src/main.jsx`](src/main.jsx)
- Vite — [`vite.config.js`](vite.config.js)
- Tailwind CSS — [`tailwind.config.js`](tailwind.config.js) + [`postcss.config.js`](postcss.config.js)
- Firebase — [src/firebase/](src/firebase/)
- Lottie animations — [src/Animation/](src/Animation/)
- Deployment: Vercel — [`vercel.json`](vercel.json), [`.vercel/project.json`](.vercel/project.json)
- Tooling: ESLint — [`eslint.config.js`](eslint.config.js)

## Project structure (high level)

- src/
  - App and entry: [`src/App.jsx`](src/App.jsx), [`src/main.jsx`](src/main.jsx)
  - Styles: [`src/index.css`](src/index.css)
  - Components: [src/components/](src/components/)
  - Animations: [src/Animation/](src/Animation/)
  - Context: [src/Context/](src/Context/)
  - Firebase: [src/firebase/](src/firebase/)
  - Pages & Routes: [src/pages/](src/pages/), [src/routes/](src/routes/)
- public/ — static files and redirects ([public/\_redirects](public/_redirects))
- config and build files at repo root (see links above)

## Getting started

Prerequisites: Node.js (16+ recommended) and npm or pnpm.

Install dependencies:

```bash
npm install
```
