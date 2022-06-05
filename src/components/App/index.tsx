import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from 'src/pages/Home'
import Navbar from 'src/components/Navbar'
import RegisterPage from 'src/pages/RegisterPage'
import webRoutes from 'src/utils/web-routers'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={webRoutes.homepage} element={<Home />} />
        <Route path={webRoutes.register} element={<RegisterPage />} />
      </Routes>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1' className='form-label'>
          Email address
          <input
            type='email'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='name@example.com'
          />
        </label>
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
          Example textarea{' '}
          <textarea
            className='form-control'
            id='exampleFormControlTextarea1'
            rows={3}
          />
        </label>
      </div>
    </Router>
  )
}

export default App
