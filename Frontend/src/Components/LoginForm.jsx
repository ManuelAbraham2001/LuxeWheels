import React, { useState } from 'react';
import './styles/login.css'; // Importa los estilos CSS o SCSS según tu elección

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`Iniciar sesión con ${email} y ${password}`);
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

export default LoginForm;