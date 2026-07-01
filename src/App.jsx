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

  return (
    <main>
      <header>
        <h1>React data layer</h1>
        <p className="tag">
          A standard Vite&nbsp;+&nbsp;React instance rendering its own data
          &mdash; the back-end reference for the AutoCSS remote-rendering demo.
        </p>
      </header>

      {status === 'loading' && <p role="status">Loading data&hellip;</p>}
      {status === 'error' && <p role="alert">Could not load data.</p>}

      {status === 'ready' && record && (
        <article>
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
        </article>
      )}
    </main>
  )
}

export default App
