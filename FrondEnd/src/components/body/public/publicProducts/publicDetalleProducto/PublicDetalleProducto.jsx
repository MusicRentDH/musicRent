import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import './PublicDetalleProducto.css';
import { GrGallery } from 'react-icons/gr';
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
              <Link to="/">« Atras</Link>
            </p>
          </div>
          <section className="container-detalles-fotos">
            <div className='container-detalle-izquierda'>
              {product.images && product.images.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                  alt={`${product.name}-image-0`}
                  className="img-1"
                />
              )}
            </div>
            <div className='container-detalle-derecha'>
              {product.images && product.images.length > 1 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[1].imageData}`}
                  alt={`${product.name}-image-1`}
                  className="img-2"
                />
              )}
              {product.images && product.images.length > 2 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[2].imageData}`}
                  alt={`${product.name}-image-2`} 
                  className="img-3"
                />
              )}
              {product.images && product.images.length > 3 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[3].imageData}`}
                  alt={`${product.name}-image-3`}
                  className="img-4"
                />
              )}
              {product.images && product.images.length > 4 && (
                <img
                  src={`data:image/jpeg;base64,${product.images[4].imageData}`}
                  alt={`${product.name}-image-4`}
                  className="img-5"
                />
              )}
            </div>
          </section>
          <section className='contenedor-galeria-precio'>
            <p className='precio-detalle'>
              Precio: ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className='spam-precio'> por día</span></p>
                <p className='contenedor-galeria'>
                  <GrGallery />
                  <a href="#" onClick={openGallery} style={{ color: '#000000', fontWeight: 'bold'}}>Ver más</a>
                </p>
          </section>
          <section className='descripcion-detalle-principal'>
            <p className='description-detalle'>Descripción:</p>
            <p className='descriptio-texto'>{product.description}</p>
          </section>
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
      {isGalleryOpen && <AllGalleryByProduct onClose={closeGallery} />}
    </div>
  );
};

export default PublicDetalleProducto;
