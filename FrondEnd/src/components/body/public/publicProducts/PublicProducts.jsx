import React from 'react'
import Card from './cards/Card'
import BarraBusquedaHome from './barraBusquedaHome/BarraBusquedaHome'
import Categorias from './categorias/Categorias'


const PublicProducts = () => {
  return (
    <>
        <BarraBusquedaHome />
        <Categorias />
        <Card />
    </>
  )
}

export default PublicProducts