// PublicDetalleProducto.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';

const PublicDetalleProducto = () => {
  const { id } = useParams();
  const { fetchProductById } = useApi();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const productDetails = await fetchProductById(id);
      setProduct(productDetails);
    };

    getProductDetails();
  }, [id, fetchProductById]);

  const renderImages = () => {
    if (product && product.images) {
      return product.images.map((image, index) => (
        <img
          key={`${product.id}-image-${index}`}
          src={`data:image/jpeg;base64,${image.imageData}`}
          alt={`${product.name}-image-${index}`}
        />
      ));
    }
    return null;
  };

  return (
    <div>
      <h2>Detalles del Producto</h2>
      {product ? (
        <div>
          <h3>{product.name}</h3>
          <p>Detalle: {product.detail}</p>
          <p>Precio: ${product.price}</p>
          <div>
            <h4>Imágenes del Producto</h4>
            {renderImages()}
          </div>          
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default PublicDetalleProducto;
