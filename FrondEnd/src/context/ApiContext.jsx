// ApiContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
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

  useEffect(() => {
    const fetchCaracteristicas = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/features');
        if (response.ok) {
          const data = await response.json();
          setCaracteristicas(data);
        } else {
          setError('Error feature product data');
        }
      } catch (error) {
        setError('Error feature product data');
      } finally {
        setLoading(false);
      }
    };

    fetchCaracteristicas();
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
  const deleteFeature = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/features/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCaracteristicas((prevCaracteristicas) => prevCaracteristicas.filter(caracterisicas => caracterisicas.id !== id));
      } else {
        setError('Error deleting feature');
      }
    } catch (error) {
      setError('Error deleting feature');
    }
  };

  const createFeature = async (featureData) => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/feature', {
        method: 'POST',
        body: featureData,
      });

      if (response.ok) {
        const newFeature = await response.json();
        setCategorias((prevCaracteristica) => [...prevCaracteristica, newCaracteristica]);
      } else {
        setError('Error creating feature');
      }
    } catch (error) {
      setError('Error creating feature ');
    }
  };

  const fetchFeatureById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/feature/${id}`);
      if (response.ok) {
        const feature = await response.json();
        return feature;
      } else {
        setError('Error fetching feature by ID');
        return null;
      }
    } catch (error) {
      setError('Error fetching feature by ID');
      return null;
    }
  };

  
  return (
    <ApiContext.Provider value={{ productos, loading, error, deleteProduct, createProduct, fetchProductById, deleteFeature, createFeature, fetchFeatureById, caracteristicas }}>
      
      {children}
    </ApiContext.Provider>
  );
};
export const useApi = () => {
  return useContext(ApiContext);
};
