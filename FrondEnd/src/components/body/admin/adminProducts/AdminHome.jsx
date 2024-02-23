import React from 'react'
import img from '../../../../../Images/imagen_hombre_vientos.svg'
import { useNavigate } from 'react-router-dom'
import './AdminHome.css'

const AdminHome = () => {
    const navigate = useNavigate();
  return (
    <div className='main-section'>
       <div className='center-section'>
            <section><img src={img} alt="" /></section>
                
                <section className='right-section'>
                    <h2>Administra, crea, edita y elimina</h2>
                    <div><h2 clas>instrumentos musicales</h2></div>
                    <button className='btn-dashboard' onClick={()=>navigate("/admin/dashboard")}>Lista de productos</button>
                </section>
        </div>
           

     
        
    </div>
  )
}

export default AdminHome