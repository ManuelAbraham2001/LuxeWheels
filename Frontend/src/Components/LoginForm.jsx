
import './styles/login.css'; // Importa los estilos CSS o SCSS según tu elección
import React, { useState, useEffect } from 'react';
import { useRentacarStates } from '../Context/Context'
import  { useNavigate } from 'react-router-dom'



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useRentacarStates();
  const navigate = useNavigate();



  const handleLogin = () => {
    const isAuthenticationSuccessful = email === 'usuario@example.com' && password === '1234';

    if (isAuthenticationSuccessful) {
      // Cambia el estado de la sesión
      dispatch({ type: 'LOGIN',payload: {
        user: {
          name: `${email}`,
          lastname: 'Lastname' // para sacar del back
        },
      },});
      console.log(`Iniciar sesión con ${email} y ${password}`);
      navigate('/admin');
    } else {
      console.log('Credenciales incorrectas.');
    }
  };

  return (
    <div className="background-image">
      <div className="add-vehicle-container">
        <div className="add-vehicle-form">
          <h2>Iniciar Sesión</h2>
          <label className="label-field">Email:</label>
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label-field">Contraseña:</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default LoginForm;
=======
export default LoginForm;

>>>>>>> 8838d0f5e93a671f910221f8c2ac4d3fbc8bffca
