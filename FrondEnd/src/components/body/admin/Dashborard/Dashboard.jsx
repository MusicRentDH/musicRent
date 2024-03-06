import React from 'react'
import img from '../../../../../src/assets/Admin/DashBoard/imagen_hombre_vientos.svg'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className='main-section'>
       <div className='center-section'>
            <section><img src={img} alt="" /></section>                
                <section className='right-section'>
                    <h2>Administra, crea, edita y elimina</h2>
                    <div><h2 clas>instrumentos musicales</h2></div>
                    <button className='btn-dashboard' onClick={()=>navigate("/admin/Administrar-Productos")}>Lista de productos</button>
                    <button className='btn-dashboard' onClick={()=>navigate("/admin/Administrar-Caracteristicas")}>Caractersticas</button>
                </section>
        </div>        
    </div>
  )
}

export default Dashboard

