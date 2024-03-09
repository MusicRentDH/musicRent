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

import AdminFeatures from './components/body/admin/adminCaracteristicas/AdminFeatures'
import CrearFeatures from './components/body/admin/adminCaracteristicas/CrearFeatures'
import CrearCuenta from "./components/body/user/crearCuenta/CrearCuenta";
import IniciarSesion from "./components/body/user/login/IniciarSesion";
import Perfil from "./components/body/user/Perfil/Perfil";
import EditarProducto from "./components/body/admin/adminProducts/editarProducto/EditarProducto";

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
            /* Perfil */
            <Route path="/perfil" element={<Perfil />} />
            /* Paginas Admin */
            <Route path="/admin" element={<Dashboard />} />
            /* administrar productos
            <Route path="/admin/Administrar-Productos" element={<AdminProducts />} />                
            <Route path="/admin/Administrar-Productos/crear-producto" element={<CrearProducto />} />
            <Route path="/admin/Administrar-Productos/editar-producto/:id" element={<EditarProducto />} />
            /* administrar usuarios
            <Route path="/admin/Administrar-Usuarios" element={<AdminUsuarios />} /> 
            /* administrar categorias
            <Route path="/admin/Administrar-Categorias" element={<AdminCategorias />} />
            /* administrar caracteristicas
            <Route path="/admin/Administrar-Caracteristicas" element={<AdminFeatures />} />
            <Route path= "/admin/Administrar-Caracteristicas/crear-nueva" element ={<CrearFeatures/>} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
          <Footer />
        </ApiProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
