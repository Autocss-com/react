import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // native styles disabled — demo is styled solely by the remote AutoCSS stylesheets (see index.html)
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
