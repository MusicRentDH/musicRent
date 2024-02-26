import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import './PublicDetalleProducto.css';
import { GrGallery } from "react-icons/gr"; 
import AllGalleryByProduct from './allGalleryByProduct/allGalleryByProduct/AllGalleryByProduct';

const PublicDetalleProducto = () => {
  const { id } = useParams();
  const { fetchProductById } = useApi();
  const [product, setProduct] = useState(null);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = () => {
      setIsGalleryOpen(true);
  };

  const closeGallery = () => {
      setIsGalleryOpen(false);
  };

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
          <p className='text-detalle-name'>{product.name}</p>
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
          <div className='contenedor-galeria-precio'>
          <p className='precio-detalle'>
          Precio: ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          <span className='spam-precio'> por día</span>
          </p>
          <div className='contenedor-galeria'>
          <GrGallery />
          <a href="#" onClick={openGallery}>Ver más</a>
          </div>
        </div>
          <p className='description-detalle' >Descripción: {product.description}</p>
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
      {isGalleryOpen && <AllGalleryByProduct onClose={closeGallery} />}
    </div>
  );
};

export default PublicDetalleProducto;
