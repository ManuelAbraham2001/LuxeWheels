import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./styles/Navbar.css";
import { useRentacarStates } from '../Context/Context';

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Navbar = () => {
  const navigate = useNavigate();



  const { state, dispatch } = useRentacarStates();


  const getInitials = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ').map(word => word[0]).join('');
  };
  
  const ui = localStorage.getItem('user');

  const userObj = ui ? JSON.parse(ui) : null;
  const userInitials = userObj ? getInitials(`${userObj.name} ${userObj.lastname}`.toUpperCase()) : '';
  
  console.log(`Iniciales del usuario: ${userInitials}`);



  const Auth = localStorage.getItem('isAuthenticated') === 'true'

  const [isAuthenticated, setIsAuthenticated] = useState(Auth);

  useEffect(() => {
    setIsAuthenticated(Auth);
  }, [Auth]);


  const handleLogout = () => {
    // Realiza las acciones de logout necesarias
    dispatch({ type: "LOGOUT" });      
    navigate('/');

  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo-container">
          <img
            className="logo"
            src="/images/Logo_dark1.png"
            alt="Autos de alquiler"
          />
        </div>
      </Link>

      <div className="burger-menu">
        <img src="/images/icon-hamburger.svg" />
      </div>

      <div className="right-block">
        {isAuthenticated ? (
          <>

            <Link to="/admin" className="admin">
              <button className="nav-button">Administración</button>
            </Link>

            <button onClick={handleLogout} className="nav-button">
              Cerrar Sesión
            </button>

            <span className="user-greeting">Hola, {userObj?.name || ''}</span>




            <span className="user-initials">{userInitials}</span>

            
          </>
        ) : (
          <>
            <Link to="/login" className="login">
              <button className="nav-button">Iniciar sesión</button>
            </Link>
            <Link to="/register" className="register">
              <button className="nav-button">Crear cuenta</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
