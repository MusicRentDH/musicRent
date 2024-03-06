import React from 'react'
import img from '../../../../../src/assets/Admin/DashBoard/imagen_hombre_vientos.svg'
import { useNavigate } from 'react-router-dom'
import { TbUsers } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className='main-section'>
       <div className='center-section'>
            <section className='left-section'><img className='img-admin' src={img} alt="" /></section>                
                <section className='right-section'>
                    <h2 className='dashboard-text-container'> Administra usuarios, productos, categorías y características de manera eficiente, facilitando la gestión y organización de la pagina.</h2>                    
                    <div className='dashboard-boton-container'>
                      <button className='btn-dashboard' onClick={()=>navigate("/admin/Administrar-Usuarios")}><TbUsers className='icon-admin-boton'/> Usuarios</button>
                      <button className='btn-dashboard' onClick={()=>navigate("/admin/Administrar-Categorias")}><MdOutlineCategory />Categorias</button>
                      <button className='btn-dashboard' onClick={()=>navigate("/admin/Administrar-Caracteristicas")}><TbCategoryPlus className='icon-admin-boton'/> Caracteristicas</button>
                      <button className='btn-dashboard' onClick={()=>navigate("/admin/Administrar-Productos")}><CiViewList className='icon-admin-boton'/> Lista de productos</button> 
                    </div>
                    
                </section>
        </div>        
    </div>
  )
}

export default Dashboard