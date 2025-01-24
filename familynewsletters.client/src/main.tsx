import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId='//Google Client ID'>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </GoogleOAuthProvider>
)
