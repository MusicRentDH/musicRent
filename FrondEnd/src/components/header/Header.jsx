import React from 'react';
import './header.css';
import logo from '../../assets/Header/logo.svg'
import icono_login from '../../assets/Header/icono_login.svg'
import  { Link } from "react-router-dom"



const Header = () => {
  return (
    <div className='pagina_principal-header'>
      <div className='identificacion'>
      <Link to="/">
          <img className='logo' src={logo} alt="logo" />
        </Link>
      
        
        <h2 className='Lema'>Encuentra tu nota perfecta con un solo clic</h2>
        
        </div>
          <div className='btn'>
        <button className='login-button'>
          <img src ={icono_login} alt="icono_login" />
          Iniciar Sesión
          </button>
        <button className='crear-cuenta-button'>Crear Cuenta</button>
      </div>      
    </div>
    
  );
};

export default Header;
