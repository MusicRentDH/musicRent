import React, { useState, useEffect } from 'react';
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

export default LoginPage;
