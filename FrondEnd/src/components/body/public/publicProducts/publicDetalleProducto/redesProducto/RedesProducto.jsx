import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { useApi } from '../../../../../../context/ApiContext'; 
import { IoCloseSharp } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaWhatsapp, FaCheck } from 'react-icons/fa';
import './RedesProducto.css';

const RedesProducto = ({ isOpen, onRequestClose }) => {
  const { id } = useParams();
  const { fetchProductById } = useApi(); 
  /*const fetchProductById = async (id) => {
    // Simulamos datos de un producto
    return {
      id: id,
      name: "Guitarra The Essential Les Paul",
      images: [
        { imageData: "imagen_1_base64" },
        { imageData: "imagen_2_base64" },
        { imageData: "imagen_3_base64" },
        { imageData: "imagen_4_base64" },
        { imageData: "imagen_5_base64" }
      ],
      price: 100,
      description: "La guitarra eléctrica de cuerpo sólido GIBSON Modern Collection Les Paul Classic (LPCS00TRNH1) fusiona el estilo de la Les Paul de principios de los años 60 con algunas modificaciones funcionales y probadas en el tiempo. Como era de esperar, la LP Classic está fabricada con un cuerpo de caoba y tapa de arce, junto con un mástil de caoba de perfil delgado y diapasón de palo de rosa encuadernado."
    };
  }; */
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

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

  useEffect(() => {   
    if (!isOpen) {
      setMessage('');
    }
  }, [isOpen]);

   /* const shareOnFacebook = () => {
    const facebookMessage = encodeURIComponent(`${message} ${window.location.href}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${facebookMessage}`);
    onRequestClose(); // Cierra el modal después de compartir
  };     */ 

  const shareOnTwitter = () => {
    const twitterMessage = encodeURIComponent(`${message} ${window.location.href}`);
    window.open(`https://twitter.com/intent/tweet?text=${twitterMessage}`);
    onRequestClose(); // Cierra el modal después de compartir
  };

  const shareOnWhatsapp = () => {
    const whatsappMessage = encodeURIComponent(`${message} ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${whatsappMessage}`);
    onRequestClose(); // Cierra el modal después de compartir
  };

  const handleCloseModal = () => {
    onRequestClose(); 
  };

  const copyLinkToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  return (
    <Modal
      className='container-redes'
      isOpen={isOpen}
      onRequestClose={handleCloseModal} 
      contentLabel="Detalle del Producto"
      shouldCloseOnOverlayClick={true} 
    >
    <div className='redes-modal'>

          <div className="redes-titulo">
              <h3>Detalle del Producto</h3>
              <a href="#" onClick={handleCloseModal} className="close-button">
                <IoCloseSharp />
              </a>
          </div>

          <hr/>


          <div className='container-producto'>
            
            {product && (
            <>
              <div className='container-imagen'>
                {product.images && product.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                    alt={`${product.name}-image-0`}
                  />
                )}
              </div>
              <div className="container-detalle-producto">
                  <h4 className='detalle-titulo'>{product.name}</h4>
                  <p className='detalle-descripcion'>{product.description}</p>
              </div>
            </>
            )}
          </div>
            <div className="redes-compartir">
              <h3 className='titulo-compartir'>Compartir Producto</h3>
              <hr className='hr-clara' />
              <div className="mensaje-input">
                <p>Comentario</p>
              <input 
                type="text"         
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
              />
              </div>
              <div className='botones-redes'>
                {/* <div className='fb'>
                  <button onClick={shareOnFacebook}><FaFacebookF /> Facebook</button>
                </div> */}
                <div className='x-compartir'>
                  <button onClick={shareOnTwitter} className='redes-boton-x'><BsTwitterX /> X (Twitter)</button>
                </div>
                <div className='whatsapp-compartir'>
                  <button onClick={shareOnWhatsapp} className='redes-boton-whats'><FaWhatsapp /> Whatsapp</button>
                </div>
              </div>
            </div>
            <div className="link-producto">
              <input type="text" value={window.location.href} className='link-producto-input' readOnly />
              <button onClick={copyLinkToClipboard} className='link-producto-button'>{linkCopied ? 'Link Copiado' : 'Copiar Link'}</button>
            </div>

    </div>
      
    </Modal>
  );
};

export default RedesProducto;
