import React, { useState } from 'react';
import LogoPrincipal from '../../assets/Header/logo.svg';
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

        <Link to='/authenticate'> {/* Envuelve el botón con Link y proporciona la ruta a RegistrationForm */}
    
        <button className='button-header-login'>
          {/*<p className='clogin'>
            <CiLogin className='icon-login' />
          </p>*/}
          <p className='boton-text-loguin'>Iniciar Sesion</p>
        </button>
        </Link>
        <Link to='/sign-up'> {/* Envuelve el botón con Link y proporciona la ruta a RegistrationForm */}
        <button className='button-header-create'>Crear Cuenta</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
