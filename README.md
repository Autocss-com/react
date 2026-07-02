# AutoCSS demo — React data layer

A standard **Vite + React** instance that renders its own sample data inside the
**remote [AutoCSS](https://autocss.com) UI scaffold**. It is the React back-end
reference for the AutoCSS remote-rendering demo: *have UI, bring your own data —
one UI, many back-ends.*

- **Data layer:** the app fetches `public/data/records.json` — the same JSON
  shape the AutoCSS UI consumes (`[{ id, title, intro, items: [] }]`) — and
  renders it as a table with loading/error states.
- **AutoCSS attach (styles):** the page includes the default AutoCSS Holy-Grail
  HTML scaffold and links the AutoCSS stylesheets remotely from
  `https://autocss.com`. The app's own content-level elements live inside
  `<article>`. (The AutoCSS JS runtime is **not** wired yet — styles only.)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs dist/ (base path /react/)
```

## Deploy

On push to `main`, a GitHub Actions workflow builds and publishes `dist/` to
GitHub Pages: <https://autocss-com.github.io/react/>

---

## Changes from the default scaffold

> Baseline = a fresh `npm create vite@latest -- --template react` (Vite + React 19).
> This is the **complete** list of what had to change to render the app's own
> data and to drop it into the remote AutoCSS UI. Nothing else was modified, and
> **no third-party libraries were added.**

### Data layer
- **Added `public/data/records.json`** — the sample dataset (AutoCSS contract shape).
- **Rewrote `src/App.jsx`** — fetch `` `${import.meta.env.BASE_URL}data/records.json` ``
  in a `useEffect`, track `loading`/`ready`/`error` with `useState`, and render a
  `<table>` (columns derived from the item keys). `import.meta.env.BASE_URL` is
  used so the fetch path is correct under the `/react/` Pages subpath.

### AutoCSS scaffold + remote styles
- **`index.html`** — added the block of remote AutoCSS stylesheet `<link>`s
  (`https://autocss.com/assets/css/*.css`) in the same `@layer`-cascade order as
  `autocss/index.html` (`reset, fonts, color-scheme, color-theme-66ccff, layout,
  inputs, media, typography, scrolling, a11y, forms, fallbacks, loading`;
  `themes.css` + `transitions.css` left commented out to mirror the source).
- **`src/App.jsx`** — renders the default AutoCSS Holy-Grail scaffold
  (`<app-container>` → `<app-banner>`, `<header>`, `<nav>`, `<main><article>`,
  `<aside>`, `<footer>`, trailing `<app-banner>`), with the data-driven
  content-level elements (`h1`, tagline, `h2`, intro, `<table>`) placed **inside
  `<article>`**.

### React-specific wiring (the gotchas)
- **Mount node changed from `<div id="root">` to `<app-container id="root">`**
  (`index.html`), and `App` returns the scaffold's **children** (a fragment) with
  no nested `<app-container>` and no wrapper `<div>`. This makes `<app-container>`
  the real Holy-Grail layout root that AutoCSS's `layout.css` styles as a grid.
  (`src/main.jsx` is unchanged — it still mounts on `getElementById('root')`.)
- **`checked` → `defaultChecked`** on the static scaffold inputs (the "Layouts"
  checkbox and the "System" color-scheme radio). React warns about a `checked`
  input with no `onChange`; these are display-only/uncontrolled inputs.
- **Custom elements need no configuration in React** — lowercase hyphenated tags
  (`app-container`, `app-banner`, `app-logo`, `app-legal`, `app-version`) pass
  through JSX as native custom elements.
- Glyphs (`☼ ☾ ◐ ✖`) are written as JSX string expressions (e.g. `{'☼'}`).

### Build / GitHub Pages
- **`vite.config.js`** — `base: '/react/'` (matches the project Pages URL).
- **Added `.github/workflows/deploy.yml`** — `npm ci` → `vite build` → deploy
  `dist/` to Pages (triggers on push to `main`). Requires repo **Settings → Pages
  → Source = GitHub Actions**.

### Housekeeping
- Removed the Vite starter demo (counter, React/Vite logos + hero image, demo
  markup) and trimmed `src/index.css` to a neutral base.
- `package.json` name → `autocss-react-demo`.
- Appended a Node/Vite section to `.gitignore`.
