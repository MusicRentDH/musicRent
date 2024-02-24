import React from 'react';
import "./publicDetalles.css";
import GalleryOfProducts from "../../galleryOfProducts/GalleryOfProducts.jsx";
import { useApi } from "../../../context/ApiContext.jsx";
import { Link } from 'react-router-dom';

const PublicDetalles = () => {
  const { productos } = useApi();

  // Filtrar el producto con id igual a 2
  const filteredProduct = productos.find(producto => producto.id === 2);

  return (
      <div className='containerp'>
        {filteredProduct && (
            <div className='containeriz'>
              <div className='containernombrep'>
                <h2>{filteredProduct.name}</h2> {/* Usar filteredProduct en lugar de product */}
                <ul className="pagination"> {/* Cambiar class por className */}
                  <li><Link to="/">« <span> Atras </span></Link></li> {/* Cambiar spam por span */}
                </ul>
              </div>
              <GalleryOfProducts id="gallery-section" product={filteredProduct} /> {/* Pasar filteredProduct como prop a GalleryOfProducts */}
              <div className='containerder'>
                <p>{`Price: $${filteredProduct.price}`}</p> {/* Usar filteredProduct en lugar de product */}
                <p className='descripcion'>{`Description: ${filteredProduct.description}`}</p> {/* Usar filteredProduct en lugar de product */}
                <div className='containerboton'>
                  <button className='reservarBtn'>
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};
export default PublicDetalles;
