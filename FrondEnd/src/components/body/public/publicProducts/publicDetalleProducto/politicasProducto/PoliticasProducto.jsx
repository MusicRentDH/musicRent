import React from 'react';
import Modal from 'react-modal';
/* import { IoCloseSharp } from "react-icons/io5"; */
import { TfiBook } from "react-icons/tfi";
import './PoliticasProducto.css';

Modal.setAppElement('#root');

const PoliticasProducto = ({ isOpen, onRequestClose }) => {
  return (
    <Modal className='modal-container'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Políticas del Producto"
    >
      <div className="politicas-header">
    

        <h2><TfiBook /> Políticas del Producto</h2>
       
      
      <div className='politica-contenido'>
      <section className='politica-content-1'>
        <h3>
        Política de Reserva:
        </h3>
        <p>
        Los clientes pueden reservar instrumentos musicales a través de nuestra plataforma en línea. Las reservas están sujetas a disponibilidad y se confirman una vez que se haya completado el proceso de pago.
        </p>
        <h3>
        Política de Pago:
        </h3>
        <p>
        Se requiere el pago completo al momento de la reserva para garantizar la disponibilidad del instrumento seleccionado. Aceptamos pagos en línea a través de métodos seguros de pago electrónico.        
        </p>
        <h3>
        Política de Cancelación:
        </h3>
        <p>
        Las cancelaciones deben realizarse al menos 24 horas antes del inicio del período de reserva para ser elegibles para un reembolso completo. Las cancelaciones realizadas dentro de las 24 horas no son elegibles para reembolso.        
        </p>
        <h3>
        Política de Modificación: 
        </h3>
        <p>
        Los cambios en las reservas están sujetos a disponibilidad. Se pueden aplicar cargos adicionales dependiendo de la naturaleza del cambio solicitado. Por favor, contáctenos lo antes posible para solicitar modificaciones.        
        </p>         
      </section>
      <section className='politica-content-2'>
      <h3>
        Política de Devolución: 
        </h3>
        <p>
        No se ofrecen devoluciones una vez que el período de reserva ha comenzado. Si surge algún problema con el instrumento reservado, contáctenos de inmediato para resolver la situación de manera satisfactoria.        
        </p>
        <h3>
        Política de Daños y Pérdidas: 
        </h3>
        <p>
        Los clientes son responsables de cualquier daño o pérdida de los instrumentos durante el período de reserva. Se pueden aplicar cargos adicionales para cubrir los costos de reparación o reemplazo, según sea necesario.        
        </p>
        <h3>
        Política de Recolección y Devolución:
        </h3>
        <p>
        Los clientes deben recolectar los instrumentos reservados en la fecha y hora programadas. Se aplicarán cargos por retrasos en la recolección. Los instrumentos deben devolverse en las mismas condiciones en que se recibieron, de lo contrario, se pueden aplicar cargos adicionales.
        </p>
        
        <p>
        <span className='negro'>Nota:</span> Estas políticas están sujetas a cambios y actualizaciones sin previo aviso. Se recomienda a los clientes revisarlas periódicamente para estar al tanto de cualquier modificación.        
        </p>

      </section>
      
      </div>
      <button className="close-button-final" onClick={onRequestClose}>Cancelar</button>

      </div>
    </Modal>
  );
};

export default PoliticasProducto;


