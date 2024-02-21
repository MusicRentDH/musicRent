import React from 'react';
import imagenBuscador from '../../../../../img/imagen_home_mujer.svg';
import './PublicCategoria.css';

const PublicCategorias = () => {
  return (
    <div className='containerPrincipal'>
      <div className='container-izq'>
        <p>Busca el instrumento que deseas rentar al mejor precio</p>
        <div className="search-bar">
          <input type="text" placeholder="Buscar instrumento..." />
          <button type="button">Buscar</button>
        </div>
      </div>
      <div className='container-der'>
        <img src={imagenBuscador} alt="" />
      </div>
    </div>
  );
}

export default PublicCategorias;
