import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export const AuthMiddleware = ({children, redirectTo='/', isAuthenticated, isAdmin}) => {

  const navigate = useNavigate();
  const path = useLocation()

  if(isAuthenticated && path.pathname.startsWith('/admin') && isAdmin){
    return <Outlet></Outlet>
  }else{
    navigate(redirectTo);
  }

  return children ? children : <Outlet />
}