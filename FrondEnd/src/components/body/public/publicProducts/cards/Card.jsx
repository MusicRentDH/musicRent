import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ selectedCategories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([])
  const [productosPerPage, setProductosPerPage] = useState(10);
  const [currentProductos, setCurrentProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchProductos = async () => {
    const response = await fetch('http://localhost:8081/api/admin/products');
    const data = await response.json();
    setProducts(data)      
    setIsLoading(false)
  };

  useEffect(() => {
    fetchProductos()
  }, [])
  
  useEffect(() => {
    if(products.length === 0) return


    const randomSortedProducts = [...products].sort(() => Math.random() - 0.5);

    const filteredProductos = randomSortedProducts.filter(
      producto =>
        selectedCategories.length === 0 ||
        selectedCategories.some(category => category.id === producto.categoryName)
    );

    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;

    const productosForPage = filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto);

    setCurrentProductos(productosForPage);
  }, [currentPage, products, productosPerPage, selectedCategories]);

  const totalProductos = products
    .filter(producto => selectedCategories.length === 0 || selectedCategories.some(category => category.id === producto.categoryName))
    .length;

  const nextPage = () => {
    const lastPageIndex = Math.ceil(totalProductos / productosPerPage);

    if (currentPage < lastPageIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className='text-title-card'>Instrumentos Recomendados: {totalProductos}</h2>
      <div className="recomendados"></div>
      {isLoading && <span>Cargando...</span>}
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
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>‹</button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(totalProductos / productosPerPage)}>›</button>
      </div>
    </div>
  );
};

export default Card;
