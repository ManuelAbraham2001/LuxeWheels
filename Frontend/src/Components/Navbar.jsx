import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import { useRentacarStates } from "../Context/Context";
import { jwtDecode } from "jwt-decode";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useRentacarStates();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const [ui, setUi] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwt");
      const decoded = jwtDecode(token);
      setUi(decoded.nombre);
      setIsAuthenticated(true);
      setIsAdmin(decoded.esAdmin);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return "";
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  const userObj = ui || null;
  const userInitials = userObj ? getInitials(ui.toUpperCase()) : "";

  const handleLogout = () => {
    // Realiza las acciones de logout necesarias
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
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

      <div className="user-info">
        <div className="right-block">
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link to="/admin" className="admin">
                  <button className="nav-button">Administración</button>
                </Link>
              ) : null}


              <div className="logout">

                <span className="user-greeting">Hola, {ui || ''}</span>
                <span className="user-initials">{userInitials}</span>

                <button onClick={handleLogout} className="nav-button">
                  Cerrar Sesión
                </button>
              </div>
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
      </div>
    </nav>
  );
};

export default Navbar;

/*

            <div className="user-info">
              <span className="user-greeting">Hola, {ui || ''}</span>
              <span className="user-initials">
                {userInitials}
                <button onClick={handleLogout} className="nav-button">
                  Cerrar Sesión
                </button>
              </span>
            </div>


//



            <button onClick={handleLogout} className="nav-button">
              Cerrar Sesión
            </button>

            <span className="user-greeting">Hola, {ui || ''}</span>
            <span className="user-initials">{userInitials}</span>

*/
