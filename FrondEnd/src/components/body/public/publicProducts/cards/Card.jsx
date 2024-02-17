// Archivo: Card.js
import React from 'react';
import { useApi } from '../../../../../context/ApiContext';

const Card = () => {
  const { productos } = useApi();
  
  
  return (
    <div>
      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.name}</h3>
          <p>Precio: <span>${producto.price}</span></p>
          <p>{producto.description}</p>
          <img
            src={`data:image/jpeg;base64,${producto.images[0].imageData}`}
            alt={`${producto.name}-imagen-0`}
          />
        </div>
      ))}
    </div>
  );
};

export default Card;


