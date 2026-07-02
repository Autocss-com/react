# AutoCSS demo — React data layer

A standard **Vite + React** instance that renders its own sample data. It is the
React back-end reference for the [AutoCSS](https://autocss.com) remote-rendering
demo: *have UI, bring your own data — one UI, many back-ends.*

**Stage 1 (this repo today):** the app fetches `public/data/records.json` — the
same JSON shape the AutoCSS UI consumes (`[{ id, title, intro, items: [] }]`) —
and renders it as a table with loading/error states. No AutoCSS attached yet.

**Stage 2 (later):** the remote AutoCSS UI is attached to render this same data.

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
