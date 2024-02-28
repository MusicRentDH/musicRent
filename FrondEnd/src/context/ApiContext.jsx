// ApiContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/products');
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          setError('Error fetching product data');
        }
      } catch (error) {
        setError('Error fetching product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProductos((prevProductos) => prevProductos.filter(producto => producto.id !== id));
      } else {
        setError('Error deleting product');
      }
    } catch (error) {
      setError('Error deleting product');
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/products', {
        method: 'POST',
        body: productData,
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProductos((prevProductos) => [...prevProductos, newProduct]);
      } else {
        setError('Error creating product');
      }
    } catch (error) {
      setError('Error creating product');
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/products/${id}`);
      if (response.ok) {
        const product = await response.json();
        return product;
      } else {
        setError('Error fetching product by ID');
        return null;
      }
    } catch (error) {
      setError('Error fetching product by ID');
      return null;
    }
  };

  return (
    <ApiContext.Provider value={{ productos, loading, error, deleteProduct, createProduct, fetchProductById }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
