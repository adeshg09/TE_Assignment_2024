import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './pages/Home'

export default function App () {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Layout>
  )
}
