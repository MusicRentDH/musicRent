import React from 'react'
import './barraBusquedaHome.css'
import imagen_home from '../../../../../imagen/BarraBusquedaHome/imagen_home_mujer.svg'


const BarraBusquedaHome = () => {
  return (
    <div className='body-container pagina_principal-barra_busqueda'>
      <div>
        <h2 className='h2-styles'>Busca el instrumento que deseas rentar al mejor precio </h2>
        <div className='search-bar-container'>
          <input type="text" className='search-input-styles' placeholder=''/>
          
          <button className='search-button-styles'>Buscar</button>
      </div>
      </div>
      <div>
          <img className='image-styles' src={imagen_home} alt="Guitarrista" />
        </div>
      <div>
      </div>      
    </div> 
  )
}

export default BarraBusquedaHome