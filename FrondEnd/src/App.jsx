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
import Filtro from "./components/body/public/publicProducts/categorias/filtro/Filtro";
import AdminUsuarios from './components/body/admin/adminUsuarios/AdminUsuarios'
import AdminCategorias from './components/body/admin/adminCategorias/AdminCategorias'
import AdminCaracteristicas from './components/body/admin/adminCaracteristicas/AdminCarasteristicas'
import CrearCuenta from "./components/body/user/crearCuenta/CrearCuenta";
import IniciarSesion from "./components/body/user/login/IniciarSesion";

function App() {
  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <Header />
          <Routes>
            /* Pagina principal */
            <Route path="/" element={<PublicProducts />} />
            <Route path="/detalle-producto/:id" element={<PublicDetalleProducto />} />
            <Route path="/categoria/:id/:nombreCategoria" element={<Filtro />}/>
            /* seccion login*/
            <Route path="/registro" element={<CrearCuenta />}/>
            <Route path="/inicioSesion" element={<IniciarSesion />}/>
            /* Paginas Admin */
            <Route path="/admin" element={<Dashboard />} />
            /* administrar productos
            <Route path="/admin/Administrar-Productos" element={<AdminProducts />} />                
            <Route path="/admin/Administrar-Productos/crear-producto" element={<CrearProducto />} />            
            /* administrar usuarios
            <Route path="/admin/Administrar-Usuarios" element={<AdminUsuarios />} /> 
            /* administrar categorias
            <Route path="/admin/Administrar-Categorias" element={<AdminCategorias />} />
            /* administrar caracteristicas
            <Route path="/admin/Administrar-Caracteristicas" element={<AdminCaracteristicas />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
          <Footer />
        </ApiProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
