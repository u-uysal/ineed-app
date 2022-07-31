import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import webRoutes from 'src/utils/web-routers'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import './App.css'
import RegisterPage from './pages/RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={webRoutes.homepage} element={<Home />} />
        <Route path={webRoutes.login} element={<LoginPage />} />
        <Route path={webRoutes.register} element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
