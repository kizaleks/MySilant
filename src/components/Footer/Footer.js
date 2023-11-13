import React from 'react'
import  './Footer.css'
import logo from './logo.jpg';
  

const Footer = () => {
  return (
    <footer className='footer'>
      <div>
      <img src={logo} alt='logo' width="100%"/>    
      </div>
    </footer>
  )
}

export default Footer
