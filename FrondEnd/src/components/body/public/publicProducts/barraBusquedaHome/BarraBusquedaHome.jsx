import React from 'react';
import './BarraBusquedaHome.css';
import imagen from '../../../../../assets/BarraBusquedaHome/Chica-guitarra.png';

const BarraBusquedaHome = () => {
  return (
    <div className='container-principal'>
      <div className='container-izquierdo'>
        <p className='text-barra'>Busca el instrumento que deseas rentar al mejor precio</p>
        <div className='busqueda-buton'>
          <div className='input-container'>            
            <input className='input-barra' type="text" placeholder='Guitarra Electrica'/>
            <button className='boton-barra'>Buscar</button>
          </div>          
        </div>
      </div>
      <div className='container-derecho'>
        <img className='chica-guitarra' src={imagen} alt="logo" />
      </div>
    </div>
  );
}

export default BarraBusquedaHome;
