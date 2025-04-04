import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { DepartmentProvider } from './contexts/departmentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DepartmentProvider>
        <App />
      </DepartmentProvider>
    </AuthProvider>
  </StrictMode>,
)
