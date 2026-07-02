import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // native styles disabled — demo is styled solely by the remote AutoCSS stylesheets (see index.html)
import App from './App.jsx'

// The AutoCSS scaffold is static in index.html; the app injects ONLY the
// content-level elements into <main><article>.
createRoot(document.querySelector('main article')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
