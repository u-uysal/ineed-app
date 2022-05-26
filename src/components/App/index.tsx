import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from 'src/pages/Home'
import RegisterPage from 'src/pages/RegisterPage'
import webRoutes from 'src/utils/web-routers'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={webRoutes.homepage} element={<Home />} />
        <Route path={webRoutes.register} element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
