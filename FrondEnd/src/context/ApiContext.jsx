import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/products');
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error('Error fetching product data');
        }
      } catch (error) {
        console.error('Error fetching product data', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <ApiContext.Provider value={{ productos }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
