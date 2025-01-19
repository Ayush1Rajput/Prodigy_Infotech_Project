import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {css} from "@mui/material"

createRoot(document.getElementById('root')).render(
  <>
    <cssBaseline/>
    <App />
  </>,
)
