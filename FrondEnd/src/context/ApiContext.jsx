import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const updateLoggedInUser = (userData) => {
    setLoggedInUser(userData);
  };


  const createAccount = async (userData) => {
    try {
      const response = await fetch('http://localhost:8081/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newAccount = await response.json();        
        setUsers((prevUsers) => [...prevUsers, newAccount]);
      } else {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.message === 'User already exists') {
          setError('User already exists. Please choose a different email.');
        } else {
          setError('Error creating account');
        }
      }
    } catch (error) {
      setError('Error creating account');
    }
  };



  const createCategory = async (categoryData) => {
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name);
      formData.append('description', categoryData.description);
      formData.append('img', categoryData.img);

      const response = await fetch('http://localhost:8081/api/admin/category', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategorias((prevCategories) => [...prevCategories, newCategory]);
      } else {
        setError('Error creating category');
      }
    } catch (error) {
      setError('Error creating category');
    }
  };


  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/list');
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          setError('Error fetching category data');
        }
      } catch (error) {
        setError('Error fetching category data');
      }
    };

    fetchCategorias();
  }, []);



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

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/products/byCategories?categoryIds=${categoryId}`);
      if (response.ok) {
        const products = await response.json();
        return products;
      } else {
        setError('Error fetching products by category');
        return null;
      }
    } catch (error) {
      setError('Error fetching products by category');
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/users/list');
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);  // Almacena los usuarios en el estado
        } else {
          setError('Error fetching user data');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  

  return (
    <ApiContext.Provider value={{ productos, loading, error, deleteProduct, createProduct, fetchProductById, fetchProductsByCategory, users, categorias, createCategory, createAccount, loggedInUser, updateLoggedInUser  }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
