import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import './PublicDetalleProducto.css';  // Ajusta la ruta según tu estructura de archivos

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

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <div className="container-detalles-fotos">
            <div className='container-detalle-izquierda'>
              {/* Renderizar la primera imagen en el div con la clase img-1 */}
              {product.images && product.images.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                  alt={`${product.name}-image-0`}
                  className="img-1"
                />
              )}
            </div>
            <div className='container-detalle-derecha'>
              {/* Renderizar solo la segunda imagen en el div con la clase img-2 */}
              {product.images && product.images.length > 1 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[1].imageData}`}
                  alt={`${product.name}-image-1`}
                  className="img-2"
                />
              )}
              {/* Renderizar solo la tercera imagen en el div con la clase img-3 */}
              {product.images && product.images.length > 2 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[2].imageData}`}
                  alt={`${product.name}-image-2`}
                  className="img-3"
                />
              )}
              {/* Renderizar solo la cuarta imagen en el div con la clase img-4 */}
              {product.images && product.images.length > 3 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[3].imageData}`}
                  alt={`${product.name}-image-3`}
                  className="img-4"
                />
              )}
              {/* Renderizar solo la quinta imagen en el div con la clase img-5 */}
              {product.images && product.images.length > 4 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[4].imageData}`}
                  alt={`${product.name}-image-4`}
                  className="img-5"
                />
              )}
            </div>
          </div>
          <p>Precio: ${product.price}</p>
          <p>Descripción: {product.detail}</p>
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default PublicDetalleProducto;
