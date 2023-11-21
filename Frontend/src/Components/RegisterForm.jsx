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
  const [errorNombre, setErrorNombre] =useState(false);
  const [errorApellido, setErrorApellido] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorDocumento, setErrorDocumento] = useState(false);

  const errorNombreMessage = <h3 style={{color: 'red'}}> Debe contener al menos dos letras </h3>;
  const errorApellidoMessage = <h3 style={{color: 'red'}}>Debe contener al menos dos letras y no se permiten caracteres especiales ni números.</h3>;
  const errorEmailMessage = <h3 style={{color: 'red'}}>Coloque un email valido(Ej:ejemplo@email.com)</h3>;
  const errorPasswordMessage = <h3 style={{color: 'red'}}>La contraseña debe contener 5 digitos o más</h3>;
  const errorFechaNacimientoMessage = <h3 style={{color: 'red'}}>Por favor coloque su fecha de nacimiento</h3>;
  const errorTelefonoMessage = <h3 style={{color: 'red'}}>Por favor verifique los datos nuevamente. Debe contener mas de 5 digitos</h3>;
  const errorDocumentoMessage = <h3 style={{color: 'red'}}>Debe contener mas de 6 digitos</h3>;


  const validarEmail = (email) => {

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return regexEmail.test(email);
  }

  const handleRegister = (e) => {
    // Lógica de registro aquí
    e.preventDefault()
    setEnviado(false)
    // setError(false)
    setErrorNombre(false)
    setErrorApellido(false)
    setErrorEmail(false)
    setErrorPassword(false)
    setErrorFechaNacimiento(false)
    setErrorTelefono(false)
    setErrorDocumento(false)

    if(form.nombre.length > 2 && form.apellido.length > 2 && validarEmail(form.email) == true && form.password.length >= 5 && form.fechaNacimiento.length > 0 && form.telefono.length > 5 && form.documento.length > 6) {
      setEnviado(true)
      setErrorNombre(false)
      setErrorApellido(false)
      setErrorEmail(false)
      setErrorPassword(false)
      setErrorFechaNacimiento(false)
      setErrorTelefono(false)
      setErrorDocumento(false)


  } 
  if(form.nombre.length < 2){
    setErrorNombre(true)
  }
  if (form.apellido.length < 2){
    setErrorApellido(true)
  }
  if (validarEmail(form.email) == false){
    setErrorEmail(true)
  }
  if(form.password.length < 5){
    setErrorPassword(true)
  }
  if(form.telefono < 6){
    setErrorTelefono(true)
  }
  if(form.fechaNacimiento.length == 0){
    setErrorFechaNacimiento(true)
  }
  if (form.documento.length < 7){
    setErrorDocumento(true)
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
  const errorNombreMessage = <h3 style={{color: 'red'}}> Debe contener al menos dos letras </h3>;
  const errorApellidoMessage = <h3 style={{color: 'red'}}>Debe contener al menos dos letras y no se permiten caracteres especiales ni números.</h3>;
  const errorEmailMessage = <h3 style={{color: 'red'}}>Coloque un email valido(Ej:ejemplo@email.com)</h3>;
  const errorPasswordMessage = <h3 style={{color: 'red'}}>La contraseña debe contener 5 digitos o más</h3>;
  const errorFechaNacimientoMessage = <h3 style={{color: 'red'}}>Por favor coloque su fecha de nacimiento</h3>;
  const errorTelefonoMessage = <h3 style={{color: 'red'}}>Por favor verifique los datos nuevamente. Debe contener mas de 5 digitos</h3>;
  const errorDocumentoMessage = <h3 style={{color: 'red'}}>Debe contener mas de 6 digitos</h3>;


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
          {errorNombre && <p className="error-message">{errorNombreMessage}</p>}

          <label className="label-field">Apellido:</label>
          <input
            className="input-field"
            type="text"
            value={form.apellido}
            onChange={(e) => handleInputs("apellido", e.target.value)}
          />
          {errorApellido && <p className="error-message">{errorApellidoMessage}</p>}

          <label className="label-field">Email:</label>
          <input
            className="input-field"
            type="email"
            value={form.email}
            onChange={(e) => handleInputs("email", e.target.value)}
          />
          {errorEmail && <p className="error-message">{errorEmailMessage}</p>}

          <label className="label-field">Contraseña:</label>
          <input
            className="input-field"
            type="password"
            placeholder='la contraseña debe tener mas de 5 caracteres'
            value={form.password}
            onChange={(e) => handleInputs("password", e.target.value)}
          />
          {errorPassword && <p className="error-message">{errorPasswordMessage}</p>}

          <label className="label-field">Fecha de Nacimiento:</label>
          <input
            className="input-field"
            type="date"
            value={form.fechaNacimiento}
            onChange={(e) => handleInputs("fechaNacimiento", e.target.value)}
            max={fechaActual}
          />
          {errorFechaNacimiento && <p className="error-message">{errorFechaNacimientoMessage}</p>}

          <label className="label-field">Teléfono:</label>
          <input
            className="input-field"
            type="tel"
            value={form.telefono}
            onChange={(e) => handleInputs("telefono", e.target.value)}
          />
          {errorTelefono && <p className="error-message">{errorTelefonoMessage}</p>}

          <label className="label-field">Documento:</label>
          <input
            className="input-field"
            type="text"
            value={form.documento}
            onChange={(e) => handleInputs("documento", e.target.value)}
          />
          {errorDocumento&& <p className="error-message">{errorDocumentoMessage}</p>}

          <button className="submit-button" onClick={handleRegister}>
            Registrarse
          </button>
          {enviado && <div> 
            <h3>Hola {form.nombre}! te has registrado correctamente!</h3> 
            <span>Recibiras un email para confirmar los datos de tu cuenta.</span>
            <br />
            <span>No recibiste el correo? <a onClick={() => console.log("asd")} style={{color: "white"}}>Volver a enviar</a></span>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;