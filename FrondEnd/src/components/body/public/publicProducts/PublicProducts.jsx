import React from 'react'
import { useState } from 'react'
import Card from './cards/Card'
import BarraBusquedaHome from './barraBusquedaHome/BarraBusquedaHome'
import Categorias from './categorias/Categorias'


const PublicProducts = () => {

  const [selectedCategories, setSelectedCategories] = useState([]);  
  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };


  return (
    <>
      <BarraBusquedaHome onCategoryChange={handleCategoryChange} />
      <Categorias />
      <Card selectedCategories={selectedCategories} />
    </>
  )
}

export default PublicProducts