import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// React here is a DATA LAYER, not a view — it owns no visual DOM node. Mount on
// a detached container so the framework never claims AutoCSS's <main><article>
// render target; the component fetches/prepares data and renders no UI.
createRoot(document.createElement('app-data')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
