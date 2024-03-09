import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../context/ApiContext'; 
import './Perfil.css';

const Perfil = () => {
  const { loggedInUser } = useApi();
  
  useEffect(() => {
    console.log("Datos del usuario:", loggedInUser);
  }, [loggedInUser]);

  return (
    <div className='container-perfil'>
      <div className='container-franja'>
        <div className='franja'>
          <h2 className='h2perfil'>Perfil</h2>
          <p className="paginacion-atras">
            <Link to="/" class="link-gris">« Atras</Link>
          </p>
        </div>
        <div className='container-login-user'>
          <div className="circle-login-avatar">
            {loggedInUser && loggedInUser.userName && loggedInUser.userName.charAt(0)}
            {loggedInUser && loggedInUser.lastName && loggedInUser.lastName.charAt(0)}
          </div>
        </div>
      </div>
      <div className="perfil-info">
        <div className="info-group">
          <label htmlFor="firstName">Nombre</label>
          <div className="info-value">{loggedInUser && loggedInUser.userName}</div>
        </div>

        <div className="info-group">
          <label htmlFor="lastName">Apellido</label>
          <div className="info-value">{loggedInUser && loggedInUser.lastName}</div>
        </div>
        
        <div className="info-group">
          <label htmlFor="email">Correo Electrónico</label>
          <div className="info-value">{loggedInUser && loggedInUser.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
