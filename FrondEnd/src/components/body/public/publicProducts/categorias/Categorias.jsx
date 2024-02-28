import React, { useState, useEffect } from 'react';
import './categorias.css';
import icono_cuerdas from '../../../../../assets/Categorias/icono_cuerdas.svg'
import icono_percusion from '../../../../../assets/Categorias/icono_percusion.svg'




const Categorias = () => {
  
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las categorías
    fetch('http://localhost:8081/api/admin')
      .then(response => response.json())
      .then(data => {
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }, []); // Se ejecuta solo una vez al montar el componente*/

  

  return (
    <div>
      <h2>Busca por tipo de instrumento</h2>
      <div className='categorias-container'>  
          
        {categorias.map((categoria) => (
          <button key={categoria.id} className='categoria-button' onClick={() => handleClick(categoria)}>
            <img src={icono_cuerdas} alt="icono_cuerdas" />
          

          
            {categoria.name}
            
            

          </button>
        ))}
      </div>
    </div>
  );
};

export default Categorias;