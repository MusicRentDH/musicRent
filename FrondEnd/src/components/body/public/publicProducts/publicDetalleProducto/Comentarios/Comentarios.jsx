import React, { useState } from 'react';
import Estrellas from '../Comentarios/Estrellas/Estrellas';
import icon_calendar from '../../../../../../assets/Detalle/fecha.svg';
import './Comentarios.css';
import Modal from 'react-modal';

const Comentarios = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [comentarioData, setComentarioData] = useState({
    puntuacion: 0,
    comentario: ''
  });

  const handleComentar = () => {
    setShowModal(true); // Abre el modal al hacer clic en el botón "Comentar"
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal al hacer clic en el botón "Cancelar" del modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComentarioData({ ...comentarioData, [name]: value });
  };

  const handleGuardarComentario = () => {
    // Aquí puedes manejar la lógica para guardar el comentario
    // Por ejemplo, puedes enviar los datos al servidor o hacer cualquier otra acción necesaria
    console.log('Guardando comentario:', comentarioData);
    closeModal();
  };

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

  return (
    <div className="valoraciones-container">
      <div className='titulo-boton'>
        <h2>Opiniones</h2>
        <button className="comentar-button" onClick={handleComentar}>Comentar</button> {/* Botón de comentario */}
      </div>
      <hr className='hr-clara' />
      <div>
        <p className='subtitulos-detalle-valoracion'>Puntuación general</p>
        <div className="puntuacion-general">
          <Estrellas rating={calcularPuntuacionMedia()} /> {/* Puntuación de estrellas */}
          <p> {`${calcularPuntuacionMedia()}/5`}  |   {valoraciones.length} opiniones</p>
        </div>
      </div>
      {valoraciones.map(valoracion => (
        <div key={valoracion.id} className="valoracion">
          <div className="detalles">
            <hr className='hr-clara' />
            <div className='nombre-fecha'>
              <p className="usuario">{valoracion.usuario}</p>
              <div className='fecha'>
                <img className='icon-calendar' src={icon_calendar} alt='icon-calendar' />
                <p className="fecha">Fecha: {valoracion.fecha}</p>
              </div>
            </div>
            <div className='valoracion-estrellas'>
              <Estrellas rating={valoracion.puntuacion} /> {/* Puntuación de estrellas */}
              <p> {`${valoracion.puntuacion}/5`}</p>
            </div>
            <p className="comentario">{valoracion.comentario}</p>
          </div>
        </div>
      ))}
      {/* Modal para el formulario de comentarios */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Modal de Comentario"
        className="Modal"
      >
        <div>
          <h3 className='titulo-comentar'>Comentar Producto</h3>
          <hr className='hr-clara' />
          
          <div className='valoracion-estrellas'>
            <Estrellas
              rating={comentarioData.puntuacion}
              onChangeRating={(rating) => setComentarioData({ ...comentarioData, puntuacion: rating })}
            />
            <p>{comentarioData.puntuacion}/5</p> {/* Muestra la puntuación seleccionada */}
          </div>
          
          <p className='titulo-comentario'>Comentario </p>
        
          <input
              className='text-area'
              type="text"
              placeholder="Escribe tu comentario..."
              name="comentario"
              onChange={handleInputChange}
            />
          <div className="botones-comentario">
            <button className='boton-cancelar' onClick={closeModal}>Cancelar</button>
            <button className='boton-guardar' onClick={handleGuardarComentario}>Guardar</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Comentarios;
