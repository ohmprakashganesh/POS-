import { StrictMode } from 'react'
import React from 'react';            // ✅ Add this line
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./locales/i18n.js"; 

createRoot(document.getElementById('root')).render(
 <div className='overflow-x-hidden'>
 <App />
 </div>
   
 
)
