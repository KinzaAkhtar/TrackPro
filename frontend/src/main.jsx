import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import authContext from './context/authContext.jsx'


createRoot(document.getElementById('root')).render(
  <authContext>
    <App />
  </authContext>,
)