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

    console.log('Productos filtrados por categoría:', productosForPage);
    setCurrentProductos(productosForPage);
  }, [currentPage, productos, productosPerPage, selectedCategories]);

  useEffect(() => {
    const randomProductos = productos
      .filter(producto => selectedCategories.length === 0 || selectedCategories.some(category => category.id === producto.categoryName))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    console.log('Productos aleatorios por categoría:', randomProductos);
    setCurrentProductos(randomProductos);
  }, [productos, selectedCategories]);

  const nextPage = () => {
    if (currentProductos.length === productosPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(productos.length / productosPerPage));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChangePerPage = (event) => {
    setProductosPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productos.length / productosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2>Instrumentos Recomendados</h2>
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
      <div className="container-pagination">
        <div className="pagination">
          <button onClick={goToFirstPage} disabled={currentPage === 1}>«</button>
          <button onClick={prevPage} disabled={currentPage === 1}>‹</button>
          {pageNumbers.map((number) => (
            <span key={number} className={number === currentPage ? 'active' : ''} onClick={() => goToPage(number)}>
              {number}
            </span>
          ))}
          {currentPage < Math.ceil(productos.length / productosPerPage) - 4 && <span className="ellipsis">...</span>}
          <button onClick={nextPage} disabled={currentPage === Math.ceil(productos.length / productosPerPage)}>›</button>
          <button onClick={goToLastPage} disabled={currentPage === Math.ceil(productos.length / productosPerPage)}>»</button>
        </div>
        <div className="productos-per-pag">
          <label htmlFor="productosPerPage">Mostrar </label>
          <select id="productosPerPage" value={productosPerPage} onChange={handleChangePerPage}>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
          <span> productos por página</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
