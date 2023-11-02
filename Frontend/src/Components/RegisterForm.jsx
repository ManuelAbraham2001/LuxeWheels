import React, { useState } from 'react';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');

  const handleRegister = () => {
    // Lógica de registro aquí
    console.log(`Registrarse con ${nombre}, ${apellido}, ${email}, ${password}, ${fechaNac}, ${telefono}, ${documento}`);
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <br />
      <label>Apellido:</label>
      <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Contraseña:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Fecha de Nacimiento:</label>
      <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />
      <br />
      <label>Teléfono:</label>
      <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <br />
      <label>Documento:</label>
      <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default RegisterForm;