import {  Route, Routes } from 'react-router-dom'



import { ProjectProvider } from './context/projectContext'
import Layout from './components/Layout'
import HomePage from './pages/Home'

export default function App() {
  return (
    <ProjectProvider>
      
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
     
    </ProjectProvider>
  )
}