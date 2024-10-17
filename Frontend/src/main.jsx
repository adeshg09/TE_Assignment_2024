import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster
      position='top-center'
      toastOptions={{
        style: {
          background: 'black', 
          color: 'white',
        },
      }}
    />
  </BrowserRouter>
)
