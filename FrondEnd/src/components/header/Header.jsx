import React, { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import LogoPrincipal from '../../assets/Header/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { TbUsers } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedInUser } = useApi();
  const primeraLetraNombre = loggedInUser && loggedInUser.userName ? loggedInUser.userName.charAt(0) : '';
  const primeraLetraApellido = loggedInUser && loggedInUser.lastName ? loggedInUser.lastName.charAt(0) : '';
  

  useEffect(() => {
    console.log("Datos del usuario:", loggedInUser);
  }, [loggedInUser]);

  const routes = [
    {
      image: <TbUsers />,
      to: '/admin/Administrar-Usuarios',
      text: 'Usuarios'
    },
    {
      image: <TbCategoryPlus />,
      to: '/admin/Administrar-Categorias',
      text: 'Categorias'
    },
    {
      image: <CiViewList />,
      to: '/admin/Administrar-Caracteristicas',
      text: 'Caracteristicas'
    },
    {
      image: <MdOutlineCategory />,
      to: '/admin/Administrar-Productos',
      text: 'Listar Productos'
    }
  ];

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
      {loggedInUser && loggedInUser.userRole === 'ADMIN' ? (
        <div className="navBar-Admin">
          <ul>
            {routes.map(route => (
              <li key={route.to} className='listado-nav-admin nav-item' >
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? '#fa9c05' : 'black',
                  })}
                  to={route.to}
                >
                  <div className="nav-item-admin">
                    <div className="nav-icon-admin">{route.image}</div>
                    <div className="nav-text-admin">{route.text}</div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className='contenedor-botones'>
        {/* Botón de hamburguesa */}
        <button className='burger-menu' onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        {loggedInUser ? (
          // Si hay datos del usuario, no mostrar los botones de inicio de sesión y registro
          null
        ) : (
          // Si no hay datos del usuario, mostrar los botones de inicio de sesión y registro
          <>
            <Link className='link-boton-inisiar' to='/inicioSesion'>
              <button className='button-header-login'>
                <p className='boton-text-loguin'>Iniciar Sesión</p>
              </button>
            </Link>
            <Link to='/registro'>
              <button className='button-header-create'>Crear Cuenta</button>
            </Link>
          </>
        )}
      </div>
      <div className='container-login-user'>
      {loggedInUser && (
        <>
          <div className="circle-login-avatar">
            {primeraLetraNombre}
            {primeraLetraApellido}
          </div>

          <div className="circle-login-nombre">
            <p>{`${loggedInUser.userName} ${loggedInUser.lastName}`}</p>
          </div>

          <div className="circle-login-cerrar-sesion">
            <p className="circle-login-cerrar-sesion-boton">
              {/* Aquí deberías poner el componente o el código para cerrar sesión */}
              <CiLogout className='boton-cerrar-sesion-header' />Cerrar Sesión
            </p>
          </div>
        </>
      )}
    </div>        
    </div>
  );
};

export default Header;
