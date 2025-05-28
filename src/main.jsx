import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CartProvider } from './context api/CartContext.jsx'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <CartProvider>
    <App />
    </CartProvider>
  </GoogleOAuthProvider>
  // {/* </StrictMode> */}
)
