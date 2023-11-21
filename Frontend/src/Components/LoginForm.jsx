
import './styles/login.css'; // Importa los estilos CSS o SCSS según tu elección
import React, { useState, useEffect } from 'react';
import { useRentacarStates } from '../Context/Context'
import  { useNavigate } from 'react-router-dom'



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useRentacarStates();
  const navigate = useNavigate();


  const [enviado, setEnviado] = useState(false);
  const [errorEmail, setErrorEmail] =useState(false);
  const [errorPassword, setErrorPassword] = useState(false)

  const validarEmail = (email) => {

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return regexEmail.test(email);
  }
  
  const handleLogin = () => {
    // const isAuthenticationSuccessful = email === 'usuario@example.com' && password === '1234';
      // Cambia el estado de la sesión
    setEnviado(false)
    setErrorEmail(false)
    setErrorPassword(false)

    if(validarEmail(email) == true && password.length >= 5) {
      setEnviado(true)
      setErrorEmail(false)
      setErrorPassword(false)

    } else if (validarEmail(email) == false && password.length >=5) {
      setErrorEmail(true)
      setErrorPassword(false)
    }else if(validarEmail(email) == true && password.length < 5){
      setErrorEmail(false)
      setErrorPassword(true)
    }else if(validarEmail(email) == false && password.length < 5){
      setErrorEmail(true)
      setErrorPassword(true)
    }

      dispatch({ type: 'LOGIN',payload: {
        user: {
          email: email,
          password: password // para sacar del back
        },
      },});
      console.log(`Iniciar sesión con ${email} y ${password}`);

  };

  const errorEmailMessage =  <h3 style={{color: 'red'}}>Coloque un email valido(Ej:ejemplo@email.com)</h3>;
  const errorPasswordMessage =  <h3 style={{color: 'red'}}>La contraseña debe contener 5 digitos o más</h3>;


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
          {errorEmail && <p className="error-message">{errorEmailMessage}</p>}

          <label className="label-field">Contraseña:</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && <p className="error-message">{errorPasswordMessage}</p>}

          <button className="submit-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
