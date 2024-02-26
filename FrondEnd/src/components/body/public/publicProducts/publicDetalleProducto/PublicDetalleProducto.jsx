import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
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
      try {
        const productDetails = await fetchProductById(id);
        setProduct(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProductDetails();
  }, [id, fetchProductById]);

  return (
    <div className='container_principal_detalle'>
      {product ? (
        <div>
          <div className='name-atras'>
            <p className='text-detalle-name'>{product.name}</p>
            <p className="pagination">
              <Link to="/"><span>« Atras </span></Link>
            </p>
          </div>
          <div className="container-detalles-fotos">
            <div className='container-detalle-izquierda'>
              {/* Renderizar la primera imagen en el div con la clase img-1 */}
              {product.images && product.images.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0].imageData}`} // Fix template string
                  alt={`${product.name}-image-0`} // Fix template string
                  className="img-1"
                />
              )}
            </div>
            <div className='container-detalle-derecha'>
              {/* Renderizar solo la segunda imagen en el div con la clase img-2 */}
              {product.images && product.images.length > 1 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[1].imageData}`} // Fix template string
                  alt={`${product.name}-image-1`} // Fix template string
                  className="img-2"
                />
              )}
              {/* Renderizar solo la tercera imagen en el div con la clase img-3 */}
              {product.images && product.images.length > 2 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[2].imageData}`} // Fix template string
                  alt={`${product.name}-image-2`} // Fix template string
                  className="img-3"
                />
              )}
              {/* Renderizar solo la cuarta imagen en el div con la clase img-4 */}
              {product.images && product.images.length > 3 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[3].imageData}`} // Fix template string
                  alt={`${product.name}-image-3`} // Fix template string
                  className="img-4"
                />
              )}
              {/* Renderizar solo la quinta imagen en el div con la clase img-5 */}
              {product.images && product.images.length > 4 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[4].imageData}`} // Fix template string
                  alt={`${product.name}-image-4`} // Fix template string
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
              <a href="#" onClick={openGallery} style={{ color: '#000000', fontWeight: 'bold', marginLeft: '10px', fontFamily: 'Montserrat' }}>Ver más</a>
            </div>
          </div>
          <p className='description-detalle'>Descripción:</p>
          <p className='descriptio-texto'>{product.description}</p>
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
      {isGalleryOpen && <AllGalleryByProduct onClose={closeGallery} />}
    </div>
  );
};

export default PublicDetalleProducto;
