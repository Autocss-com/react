import { useEffect, useState } from 'react'
import './App.css'

// This framework's own data layer: fetch its data at runtime.
// import.meta.env.BASE_URL keeps the path correct under the GitHub Pages
// project subpath (/react/). The JSON uses the same shape the AutoCSS UI
// consumes, so a later stage can render this same data remotely.
const DATA_URL = `${import.meta.env.BASE_URL}data/records.json`

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
  const columns = record?.items?.length ? Object.keys(record.items[0]) : []

  // Default AutoCSS Holy-Grail scaffold. <app-container id="root"> is the
  // mount node in index.html, so App renders its children directly here.
  // The framework's own content-level elements live inside <article>.
  return (
    <>
      <app-banner></app-banner>
      <header>
        <app-logo></app-logo>
        <label>
          Layouts
          <input type="checkbox" defaultChecked />
        </label>
        <label aria-label="Light color scheme">
          {'☼'} Light
          <input type="radio" aria-hidden="true" name="color-scheme" value="light" />
        </label>
        <label aria-label="Dark color scheme">
          {'☾'} Dark
          <input type="radio" aria-hidden="true" name="color-scheme" value="dark" />
        </label>
        <label aria-label="System color scheme">
          {'◐'} System
          <input type="radio" aria-hidden="true" name="color-scheme" value="system" defaultChecked />
        </label>
      </header>
      <nav>
        <details open>
          <summary></summary>
          <section>
            <label><input type="radio" aria-hidden="true" name="nav" value="manage" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="faqs" /></label>
          </section>
        </details>
        <details open>
          <summary></summary>
          <section>
            <label><input type="radio" aria-hidden="true" name="nav" value="api-registration" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="audit" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="option-set" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="option-types" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="scope-type" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="server-types" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="servers" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="credentials" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="variables" /></label>
            <label><input type="radio" aria-hidden="true" name="nav" value="settings" /></label>
          </section>
        </details>
      </nav>
      <main>
        <article>
          <h1>React data layer</h1>
          <p className="tag">
            A standard Vite&nbsp;+&nbsp;React instance rendering its own data
            inside the remote AutoCSS scaffold.
          </p>

          {status === 'loading' && <p role="status">Loading data&hellip;</p>}
          {status === 'error' && <p role="alert">Could not load data.</p>}

          {status === 'ready' && record && (
            <>
              <h2>{record.title}</h2>
              <p className="intro">{record.intro}</p>
              <table>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {record.items.map((item) => (
                    <tr key={item.id}>
                      {columns.map((column) => (
                        <td key={column}>{item[column]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </article>
      </main>
      <aside>
        <h2 aria-live="polite">DETAILS</h2>
        <label role="button" aria-label="Close">
          <input type="checkbox" />
          {'✖'}
        </label>
        <form>
          <fieldset></fieldset>
          <p aria-live="polite"></p>
          <small>Note: Ensure all fields are filled correctly before submitting.</small>
          <small>Note: All fields marked with * are required.</small>
          <label role="button" aria-label="Delete">
            Delete
            <input type="checkbox" />
          </label>
          <label role="button" aria-label="Reset">
            Reset
            <input type="checkbox" />
          </label>
          <label role="button" aria-label="Save">
            Save
            <input type="checkbox" />
          </label>
        </form>
      </aside>
      <footer>
        <app-legal></app-legal>
        <app-version></app-version>
      </footer>
      <app-banner></app-banner>
    </>
  )
}

export default App
