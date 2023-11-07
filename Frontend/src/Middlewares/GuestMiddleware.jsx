import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';



export const GuestMiddleware = ({children, redirectTo='/', isAuthenticated}) => {

  const navigate = useNavigate();


  useEffect(() => {

    if (isAuthenticated) {
      // Si el usuario está autenticado, redirigir a p´gina que viene desde redirectTo
      navigate(redirectTo);
    } 
  }, [isAuthenticated, navigate]);

  return children ? children : <Outlet />
}