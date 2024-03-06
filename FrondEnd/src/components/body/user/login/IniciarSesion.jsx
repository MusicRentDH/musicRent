import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../context/ApiContext'; 
import img_login from '../../../../assets/CrearCuenta/iniciarSesion.png';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion = () => {
  const navigate = useNavigate();
  const { updateLoggedInUser } = useApi();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!usuario.trim()) {
      setEmailError('Por favor, ingrese su dirección de correo electrónico.');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Por favor, ingrese su contraseña.');
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'user_not_found') {
          setError("El usuario ingresado no existe. Por favor, verifique sus credenciales e inténtelo de nuevo.");
        } else {
          setError("El usuario o la contraseña no coinciden. Por favor, inténtelo de nuevo.");
        }
        return;
      }

      updateLoggedInUser({
        userRole: data.role,
        userName: data.name,
        userId: data.userId,
        lastName: data.lastName,
        email: data.email
      });

      switch (data.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'CUSTOMER':          
          navigate('/');
          break;       
      }

      setError(null);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Hubo un error durante el inicio de sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className='registration-form-container'>
      <div className='img'>
        <img src={img_login} alt="Login" className="img_login" />
      </div>
      <div className='form'>
        <h2 className='h2_crear_cuenta'>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor="email">Dirección de correo electrónico</label>
            <input
              type="email"
              id="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className='form-group'>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className='inf'>
          <Link to='/registro' class="link-gris">
            <p>¿Aún no tienes una cuenta creada? <span>Crea Cuenta</span></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;

