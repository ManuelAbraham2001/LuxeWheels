import React from 'react'
import "./styles/Footer.css"




const Footer = () => {
  return (
    <footer className='footer'>
        
        <div className="logo-container">
        <img className="logo"src="/images/Logo_dark1.png" alt="Autos de alquiler" />
        </div>
        <p>Copyright 2023</p>
      <div className='iconos-footer'>
        <img className='icon' src="/images/ico-facebook.png" alt='facebook-logo' />
        <img  className='icon'src="/images/ico-instagram.png" alt='instagram-logo' />
        <img  className='icon'src="/images/ico-tiktok.png" alt='tiktok-logo' />
        <img  className='icon'src="/images/ico-whatsapp.png" alt='whatsapp-logo' />
    </div>
    
    </footer>
  )
}

export default Footer
