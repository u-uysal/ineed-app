import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import webRoutes from 'src/utils/web-routers'
import LoginPage from './pages/LoginPage'
import RegistePage from './pages/RegisterPage/RegisterPage'
import Home from './pages/Home'
import './App.css'
import './assests/styles/index.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={webRoutes.homepage} element={<Home />} />
        <Route path={webRoutes.login} element={<LoginPage />} />
        <Route path={webRoutes.register} element={<RegistePage />} />
        <Route path='redirect' element={<Navigate to='/login' />} />
        <Route path='redirect' element={<Navigate to='/register' />} />
      </Routes>
    </Router>
  )
}

export default App
