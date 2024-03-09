import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import feliz from "../../../../../assets/Admin/Admin_Productos/icon-creation-product.png";
import './EditarProducto.css';

const EditarProducto = () => {
  const { editProduct, fetchProductById } = useApi();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [instrumentName, setInstrumentName] = useState('');
  const [instrumentDescription, setInstrumentDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchCategories();
    fetchInstrumentData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/list');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Error fetching categories:', response.status);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchInstrumentData = async () => {
    try {
      const product = await fetchProductById(id);

      if (product) {
        setInstrumentName(product.name);
        setInstrumentDescription(product.description);
        setPrice(product.price || 0);
        setSelectedCategory(product.categoryId);
        // Asegúrate de que el campo price y categoryId existan en tu objeto product
      } else {
        console.error('Error fetching product data:', id);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!instrumentName) {
      errors.instrumentName = 'Campo obligatorio';
    }

    if (!instrumentDescription) {
      errors.instrumentDescription = 'Campo obligatorio';
    }

    if (!selectedCategory) {
      errors.selectedCategory = 'Campo obligatorio';
    }

    if (!price || isNaN(price)) {
      errors.price = 'Ingrese un precio válido';
    }

    

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataObject = new FormData();
      formDataObject.append('name', instrumentName);
      formDataObject.append('description', instrumentDescription);
      formDataObject.append('price', price);
      formDataObject.append('categoryId', selectedCategory);
      formDataObject.append('images', image);

      try {
        await editProduct(formDataObject, id);
        setShowModal(true);

        // Limpiar el formulario
        setInstrumentName('');
        setInstrumentDescription('');
        setPrice(0);
        setSelectedCategory('');
        setImage(null);
        setValidationErrors({});
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }
  };

  return (
    <div className='container_editar_producto'>
      <div className="form-container">
        <div className="form-title">
          <h2>
             Editar producto
          </h2>
        </div>
        <form className="form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="nombreInstrumento">Nombre del Instrumento</label>
            <input
              type="text"
              id="nombreInstrumento"
              value={instrumentName}
              onChange={(e) => setInstrumentName(e.target.value)}
              placeholder={`Nombre del Instrumento`}
            />
            {validationErrors.instrumentName && (
              <p className="error-message">{validationErrors.instrumentName}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="descripcionInstrumento">Descripción del Instrumento</label>
            <input
              type="text"
              id="descripcionInstrumento"
              value={instrumentDescription}
              onChange={(e) => setInstrumentDescription(e.target.value)}
              placeholder={`Descripción del Instrumento`}
            />
            {validationErrors.instrumentDescription && (
              <p className="error-message">{validationErrors.instrumentDescription}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="precioInstrumento">Precio del Instrumento</label>
            <input
              type="number"
              id="precioInstrumento"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder={`Precio del Instrumento`}
            />
            {validationErrors.price && (
              <p className="error-message">{validationErrors.price}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="categoriaInstrumento">Categoría del Instrumento</label>
            <select
              id="categoriaInstrumento"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {validationErrors.selectedCategory && (
              <p className="error-message">{validationErrors.selectedCategory}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="archivoInstrumento">Subidor de Archivos</label>
            <input
              type="file"
              id="archivoInstrumento"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {validationErrors.image && (
              <p className="error-message">{validationErrors.image}</p>
            )}
          </div>
          <div className='botones-form'>
            <button id='boton-guardar-crear' type="submit">Guardar</button>
            <Link to="/admin/Administrar-Productos" id='boton-guardar-cerrar-link'>
              <button id='boton-guardar-crear' type="button" className='cancelar-boton' onClick={() => setShowModal(true)}>
                Cancelar
              </button>
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
              <p className='text-modal'>El instrumento musical ha sido editado con éxito!!</p>
            </div>
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarProducto;

