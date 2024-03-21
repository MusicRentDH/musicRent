import React from 'react';
import './Estrellas.css';
import estrella_llena from '../../../../../../../assets/Detalle/estrella-llena.svg';
import estrella_vacia from '../../../../../../../assets/Detalle/estrella-vacia.svg';

const Estrellas = ({ rating, onChangeRating }) => {
  // Si rating no está definido, establece su valor predeterminado a 0
  const currentRating = rating || 0;

  const handleClick = (selectedRating) => {
    onChangeRating(selectedRating);
  };

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= currentRating) {
      stars.push(<img key={i} className="star" src={estrella_llena} alt="Estrella llena" onClick={() => handleClick(i)} />);
    } else {
      stars.push(<img key={i} className="star" src={estrella_vacia} alt="Estrella vacía" onClick={() => handleClick(i)} />);
    }
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
};

export default Estrellas;
