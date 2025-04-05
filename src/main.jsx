import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { DepartmentProvider } from './contexts/departmentContext.jsx'
import { CartProvider } from './contexts/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DepartmentProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </DepartmentProvider>
    </AuthProvider>
  </StrictMode>,
)
