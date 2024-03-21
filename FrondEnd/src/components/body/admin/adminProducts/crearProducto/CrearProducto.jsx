import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';  
import feliz from "../../../../../assets/Admin/Admin_Productos/icon-creation-product.png";
import { Link } from 'react-router-dom';
import './CrearProducto.css';

const CrearProducto = () => {
  const { createProduct } = useApi();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [instrumentName, setInstrumentName] = useState('');
  const [instrumentDescription, setInstrumentDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedFeatures,setSelectedFeatures]=useState('');
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchFeatures();
  }, []);


  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/list');
      const data = await response.json();
      setCategories(data); 
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchFeatures = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/features');
      const data = await response.json();
      setFeatures(data); 
    } catch (error) {
      console.error('Error fetching features:', error);
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

    if (!price) {
      errors.price = 'Campo obligatorio';
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      errors.price = 'El precio debe ser un número mayor que cero';
    }
    if(!selectedFeatures){
      errors.selectedFeatures='Campo obligatorio';
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
      formDataObject.append('price', price);
      formDataObject.append('images', image);
      formDataObject.append('features',selectedFeatures)

      console.log('Datos que se enviarán a la API:', {
        name: instrumentName,
        description: instrumentDescription,
        categoryId: selectedCategory,
        price: price,
        image: image,
        features: selectedFeatures
      });

      try {
        // Utiliza la función createProduct del contexto en lugar de hacer la solicitud directamente
        await createProduct(formDataObject);

        setShowModal(true);

        // Limpiar el formulario
        setInstrumentName('');
        setInstrumentDescription('');
        setSelectedCategory('');
        setPrice('');
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
            <span>+</span> Agregar Producto
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
              placeholder="Guitarra Hard Rock Yamaha..."
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
              placeholder="Esta guitarra tiene gran versatilidad a la hora de usar..."
            />
            {validationErrors.instrumentDescription && (
              <p className="error-message">{validationErrors.instrumentDescription}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="precioInstrumento">Precio del Instrumento</label>
            <input
              type="text"
              id="precioInstrumento"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ingrese el precio..."
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
              <option value="">Seleccione una categoría</option>
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
        <label htmlFor="caracteristicaInstrumento">Característica del Instrumento</label>
        <select
          id="caracteristicaInstrumento"
          value={selectedFeatures}
          onChange={(e) => setSelectedFeatures(e.target.value)}
        >
          <option value="">Seleccione una característica</option>
          {features.map((feature) => ( // Usando el estado features para mapear las opciones
            <option key={feature.id} value={feature.id}>
              {feature.name}
            </option>
          ))}
        </select>
        {validationErrors.selectedFeatures && (
          <p className="error-message">{validationErrors.selectedFeatures}</p>
        )}
      </div>
          <div>
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
          <div className='botones-form-crear'>
            <button className='boton-guardar-crear' id='boton-guardar-crear' type="submit">Guardar</button>
            <Link to="/admin/Administrar-Productos" id='boton-guardar-cerrar-link'>
              <button type="button" id='boton-guardar-cerrar' >Regresar</button>
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
              <p className='text-modal'>El instrumento musical ha sido creado con éxito!!</p>
            </div>
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearProducto;