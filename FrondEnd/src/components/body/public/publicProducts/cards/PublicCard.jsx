import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { PiShoppingCartLight } from 'react-icons/pi';
import { IoHeartOutline } from 'react-icons/io5'; // Importa el icono de corazón
import { useApi } from '../../../../../context/ApiContext';
import './PublicCard.css';

const PublicCard = () => {
  const { productos } = useApi();
  const [randomProductos, setRandomProductos] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false); // Nuevo estado para gestionar si es favorito

  useEffect(() => {
    // Obtener 10 productos al azar
    const shuffledProductos = productos.sort(() => 0.5 - Math.random());
    const selectedProductos = shuffledProductos.slice(0, 10);
    setRandomProductos(selectedProductos);
  }, [productos]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Cambiar el estado al hacer clic
  };

  return (
    <section className='card-container'>
      {randomProductos.map((producto) => (
        <section key={producto.id} className='card'>
          <div className={`round-button${isFavorite ? ' favorite' : ''}`} onClick={handleFavoriteClick}>
            <IoHeartOutline className='heart-icon' />
          </div>
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
              <div className='bag'>
                <PiShoppingCartLight className='bag-icon' />
              </div>
            </section>
            <section className='card-reviews'>
              <CiStar className='ratings-start' />
              <CiStar className='ratings-start' />
              <CiStar className='ratings-start' />
              <CiStar className='ratings-start' />
              <CiStar className='ratings-start' />
              <span className='total-reviews'>4</span>
            </section>
          </div>
        </section>
      ))}
    </section>
  );
};
export default PublicCard;
