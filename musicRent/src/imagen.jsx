import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            
            <img
              src={`data:image/jpeg;base64,${product.byteimg}`}
              alt={product.name}
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


