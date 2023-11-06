import React, { useState, useEffect } from 'react';
import { useRentacarStates } from '../Context/Context'
import  { useNavigate } from 'react-router-dom'



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useRentacarStates();
  const navigate = useNavigate();


  const handleLogin = () => {
    // const isAuthenticationSuccessful = email === 'usuario@example.com' && password === '1234';
      // Cambia el estado de la sesión
      dispatch({ type: 'LOGIN',payload: {
        user: {
          email: email,
          password: password // para sacar del back
        },
      },});
      console.log(`Iniciar sesión con ${email} y ${password}`);

  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Contraseña:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default LoginForm;

