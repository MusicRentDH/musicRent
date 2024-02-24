import React from 'react';
import { useApi } from '../../../../../context/ApiContext';
import './card.css'

const Card = () => {
  const { productos } = useApi();
  
  
  return (

    
<div>
  <h2>Instrumentos Recomendados</h2>
  <h3 className='mirar-todos'>Mirar todos</h3>
    
    <div className="productos-container">
    {productos.map((producto) => (
      <div key={producto.id} className='producto-card'>
        <div className='imagen-container'>
          <div className='imagen-wrapper'>
            <img
          src={`data:image/jpeg;base64,${producto.images[0].imageData}`}
          alt={`${producto.name}-imagen-0`}
          />
          </div>
          
          </div>
          <div className='informacion'>
            <h3 className='producto'>{producto.name}</h3>
            <p className='precio-rojo'>${producto.price}<span className='por_dia'>por día</span></p>
            
          </div>              
      </div>
    ))} 
  </div>
</div>
);
};
  

export default Card;


