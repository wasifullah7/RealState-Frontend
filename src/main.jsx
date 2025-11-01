// src/main.jsx (CORRECTED FINAL VERSION)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // <--- NEW IMPORT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* <--- WRAPPER ADDED */}
      <App />
    </AuthProvider>
  </StrictMode>,
)