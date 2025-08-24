import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/reset.css'
import '@/assets/styles/global.css'
import '@/assets/styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
