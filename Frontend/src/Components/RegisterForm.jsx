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

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    telefono: "",
    documento: ""
  })

  const fechaActual = new Date().toISOString().split('T')[0];

  const handleInputs = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  }

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

    if(form.nombre.length > 4 && form.apellido.length > 4 && validarEmail(form.email) == true && form.password.length >= 5) {
      setEnviado(true)
      setError(false)
  } else {
      setError(true)
  }

  setForm({
    ...form,
    telefono: parseInt(form.telefono)
  });

  fetch("http://3.135.246.162/api/auth/singup", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "content-type": "application/json"
    }
  })

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
            value={form.nombre}
            onChange={(e) => handleInputs("nombre", e.target.value)}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}

          <label className="label-field">Apellido:</label>
          <input
            className="input-field"
            type="text"
            value={form.apellido}
            onChange={(e) => handleInputs("apellido", e.target.value)}
          />
          {errors.apellido && <p className="error-message">{errors.apellido}</p>}

          <label className="label-field">Email:</label>
          <input
            className="input-field"
            type="email"
            value={form.email}
            onChange={(e) => handleInputs("email", e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label className="label-field">Contraseña:</label>
          <input
            className="input-field"
            type="password"
            placeholder='la contraseña debe tener mas de 5 caracteres'
            value={form.password}
            onChange={(e) => handleInputs("password", e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <label className="label-field">Fecha de Nacimiento:</label>
          <input
            className="input-field"
            type="date"
            value={form.fechaNacimiento}
            onChange={(e) => handleInputs("fechaNacimiento", e.target.value)}
            max={fechaActual}
          />
          {errors.fechaNac && <p className="error-message">{errors.fechaNac}</p>}

          <label className="label-field">Teléfono:</label>
          <input
            className="input-field"
            type="tel"
            value={form.telefono}
            onChange={(e) => handleInputs("telefono", e.target.value)}
          />
          {errors.telefono && <p className="error-message">{errors.telefono}</p>}

          <label className="label-field">Documento:</label>
          <input
            className="input-field"
            type="text"
            value={form.documento}
            onChange={(e) => handleInputs("documento", e.target.value)}
          />
          {errors.documento && <p className="error-message">{errors.documento}</p>}

          <button className="submit-button" onClick={handleRegister}>
            Registrarse
          </button>
          {enviado && <div> 
            <h3>Hola {form.nombre}! te has registrado correctamente!</h3> 
            <span>Recibiras un email para confirmar los datos de tu cuenta.</span>
            <br />
            <span>No recibiste el correo? <a onClick={() => console.log("asd")} style={{color: "white"}}>Volver a enviar</a></span>
            </div>}
          {errors && <h3 style={{color: 'red'}}>Por favor verifique los datos nuevamente</h3>}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;