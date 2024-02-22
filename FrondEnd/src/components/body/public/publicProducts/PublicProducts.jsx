import React from 'react'

import BarraBusquedaHome from './barraBusquedaHome/BarraBusquedaHome'
import PublicCategorias from './publicCategorias/PublicCategorias'
import PublicCard from './cards/PublicCard'

const PublicProducts = () => {
  

  return (
    <>
        <BarraBusquedaHome />
        <PublicCategorias />
        <PublicCard />       
    </>
  )
}

export default PublicProducts