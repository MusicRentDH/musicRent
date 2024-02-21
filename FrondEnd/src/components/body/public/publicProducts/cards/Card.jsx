import React from 'react';
import './Card.css'

const Card = ({ producto }) => {
  return (
    <section className='card'>
      <div className='card-img-container'>
        <img
          className='card-img'
          src={`data:image/jpeg;base64,${producto.images[0].imageData}`}
          alt={`${producto.name}-imagen-0`}
        />
      </div>
      <div className='card-details'>
        <h3 className='card-title'>{producto.name}</h3>
        <section className='card-price'>
          <div className='price'>
            <h4>${producto.price.toLocaleString('es-ES')}</h4>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Card;


