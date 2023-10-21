import React from 'react'
import { Link } from "react-router-dom";
import './styles/Navbar.css';
import { useDentiStates } from '../Context/Context';

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Navbar = () => {

  const { state, dispatch } = useDentiStates(); 

  // Función para cambiar el tema
  const toggleTheme = () => {
    dispatch({ type: 'SWITCH_THEME' }); // Activa la acción SWITCH_THEME del contexto
};
  const bodyClassName = `body ${state.theme}`
  return (
    
    <nav className="navbar">
      <Link to="/">
        <div className="logo-container">
          <img className="logo" src='/images/Logo_dark1.png' alt="Autos de alquiler" />
        </div>

      </Link>

      <div class='burger-menu'>
            <img src='/images/icon-hamburger.svg'/>
      </div>

      <div className='right-block'>
          <button className='nav-button'>Crear cuenta</button>
          <button className='nav-button'>Iniciar sesión</button>
      </div>
    </nav>
    
  )
}

export default Navbar

