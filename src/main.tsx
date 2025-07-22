import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page/styles/index.css'
import App from './page/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
