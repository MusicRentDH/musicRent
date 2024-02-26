import React, { useState } from 'react';
import LogoPrincipal from '../../assets/Header/logo.svg';
import { CiLogin } from 'react-icons/ci';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`container-header ${menuOpen ? 'menu-open' : ''}`}>
      <div className='encabezado-logo'>
        <Link to='/'>
          <img className='logo-header' src={LogoPrincipal} alt='' />  
        </Link>        
        <p className='logo-text'>Encuentra tu nota perfecta con un solo clic</p>
      </div>
      <div className='contenedor-botones'>
        {/* Botón de hamburguesa */}
        <button className='burger-menu' onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        
        <button className='button-header-login'>
          <p className='clogin'>
            <CiLogin className='icon-login' />
          </p>
          <p className='boton-text-loguin'>Iniciar Sesion</p>
        </button>
        <button className='button-header-close'>Cerrar Sesion</button>
      </div>
    </div>
  );
};

export default Header;
