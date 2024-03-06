import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../context/ApiContext'; 
import img_login from '../../../../assets/CrearCuenta/iniciar sesión.png';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css'

const IniciarSesion = () => {
  const navigate = useNavigate();

  const {updateLoggedInUser } = useApi();
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
      setEmailError('El correo electrónico proporcionado no se encuentra registrado');
    }
    if (!password.trim()) {
      setPasswordError('Contraseña incorrecta');
    }

  
    if (!usuario.trim() || !password.trim()) {
      return;
    }


    console.log("presioné el botón ");

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

      if (!response.ok) {
        setError("El usuario o la contraseña no coinciden. Por favor, inténtalo de nuevo.");
        return;
      }

      const data = await response.json();

      

      
      updateLoggedInUser({
        userRole: data.role,
        userName: data.name,
        userId: data.userId,
        lastName: data.lastName,
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
    <div className='login-page-container'>
      <div className='img'>
        <img src={img_login} alt="Login" className="img_login" />
      </div>
      <div className='form_login'>
        <h2 className='h2_login'>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className='login_group'>
            <label htmlFor="email">Dirección de correo electrónico</label>
            <input
              type="email"
              id="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          </div>
          <button type="submit" style={{ width: '100%' }}>Iniciar Sesión</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='inf_login'>
          <Link to='/sign-up'>
            <p>¿Aún no tienes una cuenta creada? <span>Crea Cuenta</span></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
