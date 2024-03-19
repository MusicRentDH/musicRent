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
      shouldCloseOnOverlayClick={false} 
    >
      <div className="redes-header">
        <h2>Detalle del Producto</h2>
        <a href="#" onClick={handleCloseModal} className="close-button">
          <IoCloseSharp />
        </a>
      </div>
      <div className='container-producto'>
  {product && (
    <>
      <div className='container-imagen'>
        {product.images && product.images.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${product.images[0].imageData}`}
            alt={`${product.name}-image-0`}
            className="img-1"
          />
        )}
      </div>
      <div className="container-detalle-producto">
        <div className="detalle-producto">
          <h2>{product.name}</h2>
          <p className='detalle-descripcion'>{product.description}</p>
        </div>
      </div>
    </>
  )}
</div>
      <div className="redes-compartir">
        <h2>Compartir Producto</h2>
        <div className="mensaje-input">
          <p>Comentario</p>
        <input 
          type="text"         
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        </div>
        <div className='botones'>
          {/* <div className='fb'>
            <button onClick={shareOnFacebook}><FaFacebookF /> Facebook</button>
          </div> */}
          <div className='x'>
            <button onClick={shareOnTwitter}><BsTwitterX /> X (Twitter)</button>
          </div>
          <div className='whatsapp'>
            <button onClick={shareOnWhatsapp}><FaWhatsapp /> Whatsapp</button>
          </div>
        </div>
      </div>
      <div className="link-producto">
        <input type="text" value={window.location.href} readOnly />
        <button onClick={copyLinkToClipboard}>{linkCopied ? 'Link Copiado' : 'Copiar Link'}</button>
      </div>
    </Modal>
  );
};

export default RedesProducto;
