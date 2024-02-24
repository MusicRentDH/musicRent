import React from 'react'
import BarraBusquedaHome from './barraBusquedaHome/BarraBusquedaHome'
import Categorias from './categorias/Categorias'
import Card from './cards/Card'

const PublicProducts = () => {
  return (
    <>
        <BarraBusquedaHome />
        <Categorias/>
        <Card/>
    </>
  )
}

export default PublicProducts