/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';

const LoginPage = () => {
  const {login} = useApi();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    if (login.userName) {
      navigate('/authenticate');
    }
  }, [users.username, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      setError("Por favor, ingresa tanto el nombre de usuario como la contraseña.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      if (!response.ok) {
        setError("El usuario o la contraseña no coinciden. Por favor, inténtalo de nuevo.");
        return;
      }

      const data = await response.json();
      login.login({ userRole: data.role, userName: data.name });
      setError(null);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      login.logout();
      setError("Hubo un error durante el inicio de sesión. Por favor, inténtalo de nuevo.");
    }
  };


  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import img_login from '../../../../../assets/Inicio_sesion/iniciar sesión.png'; // Importa la imagen de login

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Reiniciar mensajes de error
    setEmailError('');
    setPasswordError('');

    // Validar campos de entrada
    if (!email.trim()) {
      setEmailError('El correo electrónico proporcionado no se encuentra registrado');
    }
    if (!password.trim()) {
      setPasswordError('Contraseña incorrecta');
    }

    // Si los campos están vacíos, detener el inicio de sesión
    if (!email.trim() || !password.trim()) {
      return;
    }

    // Aquí iría la lógica para iniciar sesión
  };

  return (
    <div className='login-page-container'>
      <div className='img'>
        <img src={img_login} alt="Login" className="img_login" /> {/* Agrega la imagen al principio del formulario */}
      </div>
      <div className='form_login'>
        <h2 className='h2_login'>Iniciar Sesión</h2>        
        <form onSubmit={handleLogin}>
          <div className='login_group'>
            <label htmlFor="email">Dirección de correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }} // Establece el ancho del input al 100%
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>          
          <div className='login_group'>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }} // Establece el ancho del input al 100%
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          </div>          
          <button type="submit" style={{ width: '100%' }}>Iniciar Sesión</button>
        </form>        
        <div className='inf_login'>
          <Link to='/sign-up'>
            <p>¿Aún no tienes una cuenta creada? <span>Crea Cuenta</span></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
