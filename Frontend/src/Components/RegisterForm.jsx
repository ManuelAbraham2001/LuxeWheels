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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Valida el nombre
    if (nombre.length < 3) {
      newErrors.nombre = 'Nombre debe tener al menos 3 caracteres';
    }

    // Valida el apellido
    if (apellido.length < 3) {
      newErrors.apellido = 'Apellido debe tener al menos 3 caracteres';
    }

    // Valida el email
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email) || email.length < 8) {
      newErrors.email = 'Email no válido';
    }

    // Valida la contraseña
    if (password.length < 4) {
      newErrors.password = 'Contraseña debe tener al menos 4 caracteres';
    }

    // Valida la fecha de nacimiento (asumiendo que fechaNac es una fecha en formato YYYY-MM-DD)
    const birthDate = new Date(fechaNac);
    const currentDate = new Date();
    if (currentDate.getFullYear() - birthDate.getFullYear() < 18) {
      newErrors.fechaNac = 'Debes ser mayor de 18 años';
    }

    // Valida el teléfono (requiere solo números y al menos 10 números)
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(telefono) || telefono.length < 10) {
      newErrors.telefono = 'Teléfono no válido';
    }

    // Valida el documento (requiere solo números y al menos 8 números)
    const documentoPattern = /^[0-9]+$/;
    if (!documentoPattern.test(documento) || documento.length < 8) {
      newErrors.documento = 'Documento debe tener al menos 8 números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Lógica de registro aquí si la validación es exitosa
      console.log(`Registrarse con ${nombre}, ${apellido}, ${email}, ${password}, ${fechaNac}, ${telefono}, ${documento}`);
    }
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
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;