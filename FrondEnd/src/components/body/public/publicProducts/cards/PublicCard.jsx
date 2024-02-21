import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useApi } from '../../../../../context/ApiContext';
import './PublicCard.css';

const PublicCard = () => {
  const { productos } = useApi();
  const [randomProductos, setRandomProductos] = useState([]);

  useEffect(() => {
    const shuffledProductos = productos.sort(() => 0.5 - Math.random());
    const selectedProductos = shuffledProductos.slice(0, 10);
    setRandomProductos(selectedProductos);
  }, [productos]);

  return (
    <div>
      <h2 className='title-instrumentos'>Instrumentos destacados</h2>
      <section className='card-container'>
        {randomProductos.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </section>
    </div>
  );
};

export default PublicCard;
