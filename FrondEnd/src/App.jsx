import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PublicProducts from "./components/body/public/publicProducts/PublicProducts";
import { ApiProvider } from "./context/ApiContext";
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import CrearProducto from "./components/body/admin/adminProducts/crearProducto/CrearProducto";
import AdminProducts from "./components/body/admin/adminProducts/AdminProducts";
import Dashboard from "./components/body/admin/Dashborard/Dashboard";
import PublicDetalleProducto from  './components/body/public/publicProducts/publicDetalleProducto/PublicDetalleProducto'


function App() {
  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <Header />
          <Routes>
            <Route path="/" element={<PublicProducts />} />
            <Route path="/detalle-producto/:id" element={<PublicDetalleProducto />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/Administrar-Productos" element={<AdminProducts />} />                
            <Route path="/admin/Administrar-Productos/crear-producto" element={<CrearProducto />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
          <Footer />
        </ApiProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
