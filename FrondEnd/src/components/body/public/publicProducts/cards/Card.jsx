import React, { useState, useEffect } from 'react';
import { useApi } from '../../../../../context/ApiContext';
import { Link } from 'react-router-dom';
import './card.css';

const Card = () => {
  const { productos } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage, setProductosPerPage] = useState(10);
  const [currentProductos, setCurrentProductos] = useState([]);

  useEffect(() => {
    // Calcular el índice del último producto en la página actual
    const indexOfLastProducto = currentPage * productosPerPage;
    // Calcular el índice del primer producto en la página actual
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    // Seleccionar los productos para la página actual
    const productosForPage = productos.slice(indexOfFirstProducto, indexOfLastProducto);
    setCurrentProductos(productosForPage);
  }, [currentPage, productos, productosPerPage]);

  useEffect(() => {
    // Al cambiar los productos, asegurarse de seleccionar aleatoriamente 10 productos para mostrar
    const randomProductos = productos.sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentProductos(randomProductos);
  }, [productos]);

  // Cambiar a la siguiente página
  const nextPage = () => {
    if (currentProductos.length === productosPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Ir a la primera página
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Ir a la última página
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(productos.length / productosPerPage));
  };

  // Cambiar a una página específica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cambiar la cantidad de productos por página
  const handleChangePerPage = (event) => {
    setProductosPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Regresar a la primera página al cambiar la cantidad de productos por página
  };

  // Generar los números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productos.length / productosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2>Instrumentos Recomendados</h2>
      <div className="recomendados">
      </div>
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
