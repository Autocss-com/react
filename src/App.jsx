import { createElement, useEffect, useState } from 'react'
// import './App.css' // native styles disabled — demo is styled solely by the remote AutoCSS stylesheets (see index.html)

// This framework's own data layer: fetch its data at runtime.
// import.meta.env.BASE_URL keeps the path correct under the GitHub Pages
// project subpath (/react/).
const DATA_URL = `${import.meta.env.BASE_URL}data/records.json`

// data key -> valid custom-element tag name (must contain a hyphen), matching
// AutoCSS's toTagName(): "itemName" -> "item-name", "name" -> "name-".
function toTagName(key = '') {
  let dashed = key
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
  if (!dashed.includes('-')) dashed = `${dashed}-`
  return dashed
}

// Humanize a key for a column header ("itemName" -> "Name").
function humanize(key = '') {
  return toTagName(key)
    .replace(/^item-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function App() {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setRecords(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const record = records[0]
  const items = record?.items ?? []
  const keys = items.length ? Object.keys(items[0]) : []

  // Only the content-level elements — injected into the static <article>.
  // The data table uses AutoCSS's dual-<ul> structure (header ul + body ul),
  // with custom-element cells (toTagName) — NOT a <table>.
  return (
    <>
      <h1>React data layer</h1>

      {status === 'loading' && <p role="status">Loading data&hellip;</p>}
      {status === 'error' && <p role="alert">Could not load data.</p>}

      {status === 'ready' && record && (
        <>
          <h2>{record.title}</h2>
          <p>{record.intro}</p>

          <ul aria-hidden="true">
            <li>
              {keys.map((key) =>
                createElement(toTagName(key), { key }, humanize(key)),
              )}
            </li>
          </ul>

          <ul>
            {items.map((item) => (
              <li key={item.id} tabIndex={0}>
                <label>
                  <input type="checkbox" name="row-toggle" hidden />
                  <input type="radio" name="list-item" hidden />
                  {keys.map((key) =>
                    createElement(toTagName(key), { key }, item[key] ?? ''),
                  )}
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default App
