import React, { useState, useEffect } from 'react';
import './categorias.css';
import { useNavigate } from 'react-router-dom';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada a la API para obtener las categorías
    fetch('http://localhost:8081/api/admin/list')
      .then(response => response.json())
      .then(data => {
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }, []);

  const handleClick = (categoria) => {    
    navigate(`/categoria/${categoria.id}/${categoria.name}`);
  };

  return (
    <div>
      <h2 className='text-categoria-title'>Busca por tipo de instrumento</h2>
      <div className='categorias-container'>
        {categorias.map((categoria) => (
          <button key={categoria.id} className='categoria-button' onClick={() => handleClick(categoria)}>
            <img
              src={`data:image/svg+xml;base64,${categoria.img}`} 
              alt={`icono_${categoria.name}`}
            />
            {categoria.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
