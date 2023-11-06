import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export const AuthMiddleware = ({children, redirectTo='/login', isAuthenticated}) => {

  // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';


  const navigate = useNavigate();

  useEffect(() => {

    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redirigir a p´gina que viene desde redirectTo
      navigate(redirectTo);
    } 
  }, [isAuthenticated, navigate]);

  return children ? children : <Outlet />
}