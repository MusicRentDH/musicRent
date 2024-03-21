import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import './PublicDetalleProducto.css';
// Importamos useApi pero lo simularemos localmente
import './PublicDetalleProducto.css';
import { GrGallery } from 'react-icons/gr';
import { TfiBook } from "react-icons/tfi";
import { GoShareAndroid } from "react-icons/go";
import AllGalleryByProduct from './allGalleryByProduct/allGalleryByProduct/AllGalleryByProduct';
import PoliticasProducto from '../publicDetalleProducto/politicasProducto/PoliticasProducto';
import RedesProducto from '../publicDetalleProducto/redesProducto/RedesProducto';
import Opiniones from './Comentarios/Comentarios';
import Estrellas from './Comentarios/Estrellas/Estrellas';
import Calendario from '../calendario/Calendario';

const PublicDetalleProducto = () => {
  const { id } = useParams();
  const { fetchProductById, fetchFeatureOfAProduct, caracteristicas } = useApi();

  
  // Datos hardcodeados de las valoraciones
  const valoraciones = [
    { id: 1, puntuacion: 4, usuario: 'Daniela Salamanca', fecha: '14/03/2024', comentario: 'Muy buen instrumento musical, el envío fue de acuerdo a la reserva.', puntuacionUnica: '4/5' },
    { id: 2, puntuacion: 5, usuario: 'Felipe Diaz', fecha: '12/03/2024', comentario: '¡Me encantó! Me pareció muy buena esta nueva forma de reserva de instrumentos', puntuacionUnica: '5/5' },
    { id: 3, puntuacion: 3, usuario: 'Cristian Gonzales', fecha: '10/03/2024', comentario: 'Podría mejorar. Llegó con contratiempos.', puntuacionUnica: '3/5' }
  ];

  // Función para calcular la puntuación media
  const calcularPuntuacionMedia = () => {
    const totalPuntuacion = valoraciones.reduce((acc, val) => acc + val.puntuacion, 0);
    return Math.round(totalPuntuacion / valoraciones.length); // Redondea la puntuación media sin decimales
  };

  
  const [product, setProduct] = useState(null);
  const [feature, setFeature] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPoliticasOpen, setIsPoliticasOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  
  const openPoliticas = () => {
    setIsPoliticasOpen(true);
  };

  const closePoliticas = () => {
    setIsPoliticasOpen(false);
  };
  
  const openShare = () => {
    setIsShareOpen(true);
  };

  const closeShare = () => {
    setIsShareOpen(false);
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

  const renderIMG=(url)=>{
    const urlIMG= URL.createObjectURL(url);
    return urlIMG
  }
  
  useEffect(()=>{
    const getProductFeature = async()=>{
      try{
      const productFeature = await fetchFeatureOfAProduct(id);
      setFeature(productFeature);
    } catch(error){
      console.log('Error fetching product features:', error);
    }
    };
    getProductFeature();
  }, [id, fetchFeatureOfAProduct])



  return (
    <div className='container_principal_detalle'>
      {product ? (
        <div className='detalle-producto'>
          <div className='name-atras'>
            <h3 className='text-detalle-name'>{product.name}</h3>
            <p >
            <Link to="/" className="link-gris">« Atras</Link>
            </p>
          </div>

          <div className='imagenes-descripcion'>

            <div className="container-detalles-fotos">
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
                  <div className='imagenes-derecha'>

                      <div className='img2-3'>
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
                      </div>
                          
                      <div className='img4-5'>
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

                  </div>
                  <div>            
                    <a href="#" onClick={openGallery} className='contenedor-galeria'><GrGallery /> Ver más</a>
                  </div>
                </div>
            </div>

            <div className='container-estrellas-precio-descripcion-politicas'>
                
              <div className='estrellas-redes'>

                <div className="puntuacion-general">
                <Estrellas rating={calcularPuntuacionMedia()} /> {/* Puntuación de estrellas */}
                <p> {`${calcularPuntuacionMedia()}/5`}  |   {valoraciones.length} opiniones</p>
                </div>

                <a  href="#" onClick={openShare} className='icono-redes'><GoShareAndroid /></a>

              </div>

              <p className='precio-detalle'>
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                <span className='spam-precio'> por día</span>
              </p> 

              <div className='descripcion-detalle-principal'>
                <p className='descripcion-detalle'>Descripción:</p>
                <p className='descripcion-texto'>{product.description}</p>
              </div>
              
              <div className='calendario-styles'>
                <h2>Feachas para reservar</h2>
                <Calendario className="calendar-section" />
              </div>
              
              <div className="boton-reservar">
                <button className='boton-reserva-usuario'>Reservar</button>
              </div>

              <div className='politicas'>
                <TfiBook className='icono-politicas'/>
                <div className='texto-politicas'>
                  <a  href="#" onClick={openPoliticas} className='texto-politicas'> Politicas</a>
                  <a  href="#" onClick={openPoliticas} className='link-politicas'> Revise las politicas de envio, cancelación y reserva</a>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
      {isGalleryOpen && <AllGalleryByProduct onClose={closeGallery} />}
      <PoliticasProducto isOpen={isPoliticasOpen} onRequestClose={closePoliticas} />
      <RedesProducto isOpen={isShareOpen} onRequestClose={closeShare} />   
      <div>
        <br/>
        <hr/>
          <div>
          <h2 className='description-detalle'>Caracteristicas</h2>
            <ul className='lista-caracteristicas'>
                  {feature.map((feature) => (
                    
                      <li key={feature.id}  className='lista-caracteristicas-items'> 
                      <img src={`data:image/svg+xml;base64,${feature.icon}`} alt="" 
                      style={{ width: '50px' }}
                      />
                      <p className='descriptio-texto-caracteristica'>{feature.name}</p>
                      
                      </li>
                      
                  ))}
            </ul>
          </div>        
        
      </div> 
      <div className='comentarios-componente'>  
        <hr className='hr-oscura' />
        <Opiniones />
      </div>
    </div>
  );
};

export default PublicDetalleProducto;
