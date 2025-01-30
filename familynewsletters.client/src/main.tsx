import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom';


const options = {
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string
};

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={options.client_id}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </GoogleOAuthProvider>
)
