// Archivo: Card.js
import React from 'react';
import { useApi } from '../../../../../context/ApiContext';
import { Link } from 'react-router-dom';

const Card = () => {
  const { productos } = useApi();

  console.log(productos);

  return (
    <div>
      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.name}</h3>
          <p>Precio: <span>${producto.price}</span></p>
          <p>{producto.description}</p>
          {/* Mapear sobre todas las imágenes */}
          {producto.images.map((imagen, index) => (
            <Link to= "/product/:id">
            <img
              key={index}
              src={`data:image/jpeg;base64,${imagen.imageData}`} 
              alt={`${producto.name}-imagen-${index}`} 
            /></Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Card;
