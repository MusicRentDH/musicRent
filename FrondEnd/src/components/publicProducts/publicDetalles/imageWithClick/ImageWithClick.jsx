import React from 'react';
import { Link } from 'react-router-dom';

const ImageWithClick = () => {
  return (
    <div>
      <Link to="/product/1"> {/* Reemplaza "1" con el ID de tu producto */}
        <img src="ruta_de_tu_imagen.jpg" alt="Descripción de la imagen" />
      </Link>
    </div>
  );
};

export default ImageWithClick;

/* en donde Laura importo ImageWithClick*/