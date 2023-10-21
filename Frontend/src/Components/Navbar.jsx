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
    
      <nav className='nav'>
      <ul className="navbar-list">
      <img src="/DH.ico" alt="DH" />
      {/* Aqui deberan agregar los liks correspondientes a las rutas definidas */}
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contacto">Contacto</Link></li>
      <li><Link to="/favs">Favs</Link></li>
      {/* Deberan implementar ademas la logica para cambiar de Theme con el button */}
      <button onClick={toggleTheme}>Change theme</button>
      </ul>
      </nav>
    
  )
}

export default Navbar