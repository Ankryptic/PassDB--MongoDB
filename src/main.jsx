import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Background from './components/Background'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Background/>
    <Navbar/>
    <App />
    <Footer/>
  </StrictMode>,
)
