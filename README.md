# AutoCSS demo — React data layer

A standard **Vite + React** app that renders its own data inside the remote
**[AutoCSS](https://autocss.com)** UI — *have UI, bring your own data.* The app
ships the data; AutoCSS (loaded from `https://autocss.com`) is the whole UI.

**Live:** <https://autocss-com.github.io/react/>

## Run

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build   # → dist/
```

Pushing to `main` auto-builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`.

## Using AutoCSS in a React app

Starting from a stock `npm create vite` React app, the whole integration is just
a few small touches:

1. **Link the AutoCSS styles** — add the `https://autocss.com/assets/css/…`
   stylesheets to `index.html`.
2. **Make `<app-container>` the root** — put `<app-container></app-container>` in
   `index.html` and mount into it with
   `createRoot(document.querySelector('app-container'))`. `App` renders the AutoCSS
   scaffold, with your content inside `<article>`.
3. **Bring your data** — fetch it (here `public/data/records.json`) and render.

That's it — React needs no extra config for the `app-*` custom elements.

_(Full change history: [`progress/`](./progress).)_
