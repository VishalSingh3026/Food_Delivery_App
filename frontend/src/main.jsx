import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'
import { ThemeContextProvider } from './utils/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreContextProvider>
            <ThemeContextProvider>
                <Toaster />
                <App />
            </ThemeContextProvider>
        </StoreContextProvider>
    </BrowserRouter>,
)
