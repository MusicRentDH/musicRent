// Card.js

import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';
import { Link } from 'react-router-dom';
import './card.css';

const Card = () => {
  const { productos, fetchProductById } = useApi();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * productos.length);
    setCurrentIndex(randomIndex);
  }, [productos]);

  const productsToDisplay = productos.length >= 10 ? productos.slice(currentIndex, currentIndex + 10) : [];

  return (
    <div>
      <h2>Instrumentos Recomendados</h2>
      <h3 className='mirar-todos'>Mirar todos</h3>
      <div className="productos-container">
        {productsToDisplay.map((producto, index) => (
          <div key={`${producto.id}-${index}`} className='producto-card'>
            <div className='imagen-container'>
              <Link to={`/detalle-producto/${producto.id}`}>
                <div className='imagen-wrapper'>
                  <img
                    src={`data:image/jpeg;base64,${producto.images[0].imageData}`}
                    alt={`${producto.name}-imagen-${index}`}
                  />
                </div>
              </Link>
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
