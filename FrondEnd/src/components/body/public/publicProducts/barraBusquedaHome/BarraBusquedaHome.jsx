import React, { useState, useEffect } from 'react';
import './BarraBusquedaHome.css';
import imagen from '../../../../../assets/BarraBusquedaHome/Chica-guitarra.png';
import { IoIosArrowDropdown } from "react-icons/io";

const BarraBusquedaHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Llamada a la API para obtener las categorías
    fetch('http://localhost:8081/api/admin/list')
      .then((response) => response.json())
      .then((data) => {
        // Mapear los datos obtenidos para que coincidan con la estructura de state 'categories'
        const mappedCategories = data.map((item) => ({
          id: item.name,
          label: item.name,
          checked: false,
        }));
        setCategories(mappedCategories);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, [modalOpen]); // Se ejecutará cuando modalOpen cambie

  const handleCheckboxChange = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, checked: !category.checked } : category
      )
    );
  };

  const handleSearch = () => {
    // Aquí puedes utilizar searchTerm y categories para realizar la búsqueda
    console.log('Término de búsqueda:', searchTerm);
    console.log('Categorías seleccionadas:', categories.filter((category) => category.checked));
  };

  return (
    <div className='container-principal'>
      <div className='container-izquierdo'>
        <p className='text-barra'>Busca el instrumento que deseas rentar al mejor precio</p>
        <div className='busqueda-buton'>
          <div className='input-container'>            
            <input
              className='input-barra'
              type="text"
              placeholder='Guitarra Electrica'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='dropdown' onClick={() => setModalOpen(true)}>
              Categoría <IoIosArrowDropdown className='icnn-drop-down' />
            </button>
            <button className='boton-barra' onClick={handleSearch}>Buscar</button>
          </div>          
        </div>
      </div>
      <div className='container-derecho'>
        <img className='chica-guitarra' src={imagen} alt="logo" />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className='modal-categorias'>
          <div className='modal-content-categorias'>
            <span className='close' onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <div className='checkbox-container'>
              {categories.map((category) => (
                <div key={category.id} className='checkbox-item'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    checked={category.checked}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  {category.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarraBusquedaHome;
