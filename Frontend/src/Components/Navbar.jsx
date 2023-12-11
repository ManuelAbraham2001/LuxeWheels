import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import "./styles/DropdownMenu.css";

import { useRentacarStates } from "../Context/Context";
import { jwtDecode } from "jwt-decode";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Navbar = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useRentacarStates();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    const [ui, setUi] = useState(null);

    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

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

            <div className="user-info-nav">
                <div className="right-block">
                    {isAuthenticated ? (
                        <div className='menu-container' ref={menuRef}>
                            <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                                <span className="user-initials">{userInitials}</span>
                            </div>
                            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                                <h3 id="menu-name" className="menu-name">{ui}</h3>
                                <ul>
                                    <li className='dropdownItem'>
                                        <a href="/perfil">Mi perfil</a>
                                    </li>
                                    {isAdmin ? <li className='dropdownItem'>
                                        <a href="/admin">Administracion</a>
                                    </li> : null}
                                    <li className='dropdownItem'>
                                        <a onClick={handleLogout}>Salir</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
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

