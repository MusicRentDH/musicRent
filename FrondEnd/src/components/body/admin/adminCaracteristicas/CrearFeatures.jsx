import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';  
import feliz from "../../../../../assets/Admin/Admin_Productos/icon-creation-product.png";
import { Link } from 'react-router-dom';
import './CrearFeatures.css';

const CrearFeatures = () => {
  const { createFeature } = useApi();
  const [titulo, setTitulo] = useState([]);
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

 

  const validateForm = () => {
    const errors = {};

    if (!titulo) {
      errors.titulo = 'Campo obligatorio';
    }

    if (!image) {
      errors.icon = 'Campo obligatorio';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataObject = new FormData();
      formDataObject.append('name', titulo);
      formDataObject.append('icon', image);

      console.log('Datos que se enviarán a la API:', {
        name: titulo,
        icon: image,
      });

      try {
        // Utiliza la función createProduct del contexto en lugar de hacer la solicitud directamente
        await createFeature(formDataObject);

        setShowModal(true);

        // Limpiar el formulario
        setTitulo('');
        setImage(null);
        setValidationErrors({});
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }
  };

  return (
    <div className='container_crear_producto'>
      <div className="form-container">
        <div className="form-title">
          <h2>
            <span>+</span> Añadir nueva característica
          </h2>
        </div>
        <form className="form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nuevo, usado, electrico, electroacustico..."
            />
            {validationErrors.titulo && (
              <p className="error-message">{validationErrors.titulo}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="archivoCaracateristica">Subidor de Archivos</label>
            <input
              type="file"
              id="archivoCaracateristica"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {validationErrors.image && (
              <p className="error-message">{validationErrors.image}</p>
            )}
          </div>
          <div className='botones-form'>
            <button type="submit">Guardar</button>
            <Link to="/admin/Administrar-Caracteristicas">
              <button type="button" >Regresar</button>
            </Link>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal-container">
          <div className="modal-2">
            <div style={{ textAlign: 'center' }}>
              <img className='icon-feliz' src={feliz} alt="icono" />
              <p className='text-modal'><strong>¡Felicidades!</strong></p>
              <p className='text-modal'>La característica ha sido creada con éxito</p>
            </div>
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearFeatures;
