import React, { useState } from 'react';
import './styles/register.css'; // Importa los estilos CSS para el formulario de registro

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');

  const [enviado, setEnviado] = useState(false);
  const [errors, setError] =useState(false);

  const validarEmail = (email) => {

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return regexEmail.test(email);
  }

  const handleRegister = (e) => {
    // Lógica de registro aquí
    e.preventDefault()
    setEnviado(false)
    setError(false)

    if(nombre.length > 4 && apellido.length > 4 && validarEmail(email) == true && password.length >= 5) {
      setEnviado(true)
      setError(false)
  } else {
      setError(true)
  }
    console.log(`Registrarse con ${nombre}, ${apellido}, ${email}, ${password}, ${fechaNac}, ${telefono}, ${documento}`);
  };

  return (
    <div className="background-image">
      <div className="add-vehicle-container">
        <div className="add-vehicle-form">
          <h2>Registro de Usuario</h2>
          <label className="label-field">Nombre:</label>
          <input
            className="input-field"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}

          <label className="label-field">Apellido:</label>
          <input
            className="input-field"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {errors.apellido && <p className="error-message">{errors.apellido}</p>}

          <label className="label-field">Email:</label>
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label className="label-field">Contraseña:</label>
          <input
            className="input-field"
            type="password"
            placeholder='la contraseña debe tener mas de 5 caracteres'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <label className="label-field">Fecha de Nacimiento:</label>
          <input
            className="input-field"
            type="date"
            value={fechaNac}
            onChange={(e) => setFechaNac(e.target.value)}
          />
          {errors.fechaNac && <p className="error-message">{errors.fechaNac}</p>}

          <label className="label-field">Teléfono:</label>
          <input
            className="input-field"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          {errors.telefono && <p className="error-message">{errors.telefono}</p>}

          <label className="label-field">Documento:</label>
          <input
            className="input-field"
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
          {errors.documento && <p className="error-message">{errors.documento}</p>}

          <button className="submit-button" onClick={handleRegister}>
            Registrarse
          </button>
          {enviado && <h3>Hola {nombre}! te has registrado correctamente!</h3>}
          {errors && <h3 style={{color: 'red'}}>Por favor verifique los datos nuevamente</h3>}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;