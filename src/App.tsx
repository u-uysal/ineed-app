import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from 'src/pages/Home'
import webRoutes from 'src/utils/web-routers'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={webRoutes.homepage} element={<Home />} />
        <Route path={webRoutes.login} element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
