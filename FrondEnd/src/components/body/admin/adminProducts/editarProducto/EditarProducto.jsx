import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';  
import feliz from "../../../../../assets/Admin/Admin_Productos/icon-creation-product.png";
import { Link } from 'react-router-dom';
import './EditarProducto.css';

const EditarProducto = () => {
  const { editProduct } = useApi();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [instrumentName, setInstrumentName] = useState('');
  const [instrumentDescription, setInstrumentDescription] = useState('');
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [defaultInstrumentData, setDefaultInstrumentData] = useState({
    defaultName: '',
    defaultDescription: '',
  });

  useEffect(() => {
    fetchCategories();
    fetchDefaultInstrumentData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // No estoy segura si este llamado es necesario por el contextApi
  const fetchDefaultInstrumentData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/products/${id}`);
      const data = await response.json();
      setDefaultInstrumentData(data);
    } catch (error) {
      console.error('Error fetching default instrument data:', error);
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

    if (!image) {
      errors.image = 'Campo obligatorio';
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
      formDataObject.append('categoryId', selectedCategory);
      formDataObject.append('images', image);

      console.log('Datos que se enviarán a la API:', {
        name: instrumentName,
        description: instrumentDescription,
        categoryId: selectedCategory,
        image: image,
      });

      try {
        //const id = etchProductById; Si muestro las dos líneas comentadas el modal de confirmación no se visualiza
        //await editProduct(formDataObject, id);
        await editProduct(formDataObject);
        setShowModal(true);

        // Limpiar el formulario
        setInstrumentName('');
        setInstrumentDescription('');
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
              placeholder={`Nombre del Instrumento (${defaultInstrumentData.defaultName})`}
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
              placeholder={`Descripción del Instrumento (${defaultInstrumentData.defaultDescription})`}
            />
            {validationErrors.instrumentDescription && (
              <p className="error-message">{validationErrors.instrumentDescription}</p>
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
            <button type="submit">Guardar</button>
            <Link to="/admin/Administrar-Productos">
              <button type="button" className='cancelar-boton' onClick={() => setShowModal(true)}>
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