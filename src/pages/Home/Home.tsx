import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './home.css'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='homeContainer'>
        <h1>PROJEYE HOSGELDINIZ!</h1><br/>
        <div>Giris yapmak icin tiklayiniz <Link to="/login" className="link"> Login</Link></div>
       <div> Kayit olmak icin tiklayiniz <Link to="/register" className='link'> Register</Link></div>
      </div>
    </div>
  )
  
}

export default Home
