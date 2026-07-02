// React as the DATA LAYER only.
//
// The framework's single job is data/business logic: fetch the source and
// prepare it in the shape AutoCSS's runtime consumes ({ title, intro, items }).
// It renders NO presentation — AutoCSS's own CSS + JS own all rendering of the
// h1/intro and the ul/li cells. (Recreating that here would duplicate what
// AutoCSS already does; the framework must not.)
//
// Wiring the remote AutoCSS JS runtime so it renders THIS data is the next
// build step (see PROGRESS.json `cursor.next`).

import { useEffect } from 'react'

// import.meta.env.BASE_URL keeps the path correct under the GitHub Pages
// project subpath (/react/).
const DATA_URL = `${import.meta.env.BASE_URL}data/records.json`

export default function App() {
  useEffect(() => {
    // Data layer: fetch + prepare the source. No DOM/presentation is produced.
    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        // Prepared data, ready for AutoCSS's runtime to fetch + render.
        console.info('[react data layer] prepared records', data)
      })
      .catch((error) => console.error('[react data layer] load failed', error))
  }, [])

  // The framework renders nothing — AutoCSS owns the UI.
  return null
}
