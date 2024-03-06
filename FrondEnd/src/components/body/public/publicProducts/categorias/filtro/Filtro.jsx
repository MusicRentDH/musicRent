import React, { useEffect, useState } from 'react';
import { useApi } from '../../../../../../context/ApiContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Filtro.css';
import BarraCategoria from '../barra_categoria/BarraCategoria';

const Filtro = () => {
  const { fetchProductsByCategory, loading, error } = useApi();
  const { id: categoryId, nombreCategoria } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage, setProductosPerPage] = useState(10);
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsByCategory = await fetchProductsByCategory(categoryId);

        if (productsByCategory) {
          const productsArray = Object.values(productsByCategory);
          setCategoryProducts(productsArray);
          setTotalProducts(productsArray.length);
        }
      } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchData();
  }, [fetchProductsByCategory, categoryId]);

  useEffect(() => {
    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    const productosForPage = categoryProducts.slice(indexOfFirstProducto, indexOfLastProducto);
    setCurrentCategoryProducts(productosForPage);
  }, [currentPage, categoryProducts, productosPerPage]);

  const nextPage = () => {
    if (!loading && currentCategoryProducts.length === productosPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!loading && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(categoryProducts.length / productosPerPage));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChangePerPage = (event) => {
    setProductosPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className='barra-categoria-single'>
      <BarraCategoria nombreCategoria={nombreCategoria} />
      <h2>Productos encontrados: {totalProducts}</h2>
      <div className='filtro-container-categoria'>
        <div className="recomendados"></div>
        <div className="productos-container">
          {loadingInitial ? (
            <p>Cargando productos...</p>
          ) : (
            currentCategoryProducts.map((producto, index) => (
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
            ))
          )}
        </div>
        <div className="container-pagination">
          <div className="pagination">
            <button onClick={goToFirstPage} disabled={loading || currentPage === 1}>«</button>
            <button onClick={prevPage} disabled={loading || currentPage === 1}>‹</button>
            {[...Array(Math.ceil(categoryProducts.length / productosPerPage)).keys()].map((number) => (
              <span key={number + 1} className={number + 1 === currentPage ? 'active' : ''} onClick={() => goToPage(number + 1)}>
                {number + 1}
              </span>
            ))}
            {currentPage < Math.ceil(categoryProducts.length / productosPerPage) - 4 && <span className="ellipsis">...</span>}
            <button onClick={nextPage} disabled={loading || currentPage === Math.ceil(categoryProducts.length / productosPerPage)}>›</button>
            <button onClick={goToLastPage} disabled={loading || currentPage === Math.ceil(categoryProducts.length / productosPerPage)}>»</button>
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
    </div>
  );
};

export default Filtro;
