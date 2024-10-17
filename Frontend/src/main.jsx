import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProjectProvider } from './context/projectContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <ProjectProvider>
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
    </ProjectProvider>
  </BrowserRouter>
)
