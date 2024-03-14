import React from 'react';
import Modal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5"; 

import './RedesProducto.css';

const RedesProducto = ({ isOpen, onRequestClose }) => {
  return (
    <Modal className='redes-container'
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Detalle del Producto"
    >
        <div className="redes-header">
    

        <h2>Detalle del Producto</h2>
        <button className="close-button" onClick={onRequestClose}>
        <IoCloseSharp />
        </button> 
        <div>
            
        </div>
      
      
      </div>
    </Modal>
  );
};

export default RedesProducto;


