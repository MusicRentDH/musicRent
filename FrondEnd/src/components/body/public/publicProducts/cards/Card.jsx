import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ selectedCategories }) => {
  const { productos } = useApi(); 
  const [currentPage, setCurrentPage] = useState(1);  
  const [productosPerPage, setProductosPerPage] = useState(10);  
  const [currentProductos, setCurrentProductos] = useState([]);
  
  useEffect(() => {
    
    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    
    const productosForPage = productos
      .filter(producto => selectedCategories.length === 0 || selectedCategories.some(category => category.id === producto.categoryName))
      .slice(indexOfFirstProducto, indexOfLastProducto);
    
    setCurrentProductos(productosForPage);
  }, [currentPage, productos, productosPerPage, selectedCategories]);

  
  useEffect(() => {    
    const randomProductos = productos
      .filter(producto => selectedCategories.length === 0 || selectedCategories.some(category => category.id === producto.categoryName))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    setCurrentProductos(randomProductos);
  }, [productos, selectedCategories]);
  
  const totalProductos = productos
    .filter(producto => selectedCategories.length === 0 || selectedCategories.some(category => category.id === producto.categoryName))
    .length;

  const nextPage = () => {
    if (currentProductos.length === productosPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className='text-title-card'>Instrumentos Recomendados: {totalProductos}</h2>
      <div className="recomendados"></div>
      <div className="productos-container">
        {currentProductos.map((producto, index) => (
          <div key={`${producto.id}-${index}`} className="producto-card">
            <div className="imagen-container">
              <Link to={`/detalle-producto/${producto.id}`}>
                <div className="imagen-wrapper">
                  {producto.images && producto.images.length > 0 && (
                    <img
                      src={`data:image/jpeg;base64,${producto.images[0].imageData}`}
                      alt={`${producto.name}-imagen-${index}`}
                    />
                  )}
                </div>
              </Link>
            </div>
            <div className="informacion">
              <h3 className="producto">{producto.name}</h3>
              <p className="precio-rojo">${producto.price}<span className="por_dia">por día</span></p>
            </div>
          </div>
        ))}
      </div>      
    </div>
  );
};

export default Card;
