import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from './ReactDom.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactDom />
  </StrictMode>,
)
