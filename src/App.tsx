import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import webRoutes from 'src/utils/web-routers'
import LoginPage from './pages/LoginPage'
import RegistePage from './pages/RegisterPage/RegisterPage'
import Home from './pages/Home'
import './assests/styles/index.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path={webRoutes.homepage} element={<Home />}/>
        <Route path={webRoutes.login} element={<LoginPage />} />
        <Route path={webRoutes.register} element={<RegistePage />} />
      </Routes>
    </Router>
  )
}

export default App
