import React from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Cuerdas from '../../../../../../assets/Categorias/imagen-categorias/imagen_hombre_cuerdas.svg';
import Percusion from '../../../../../../assets/Categorias/imagen-categorias/percusion.png';
import Vientos from '../../../../../../assets/Categorias/imagen-categorias/imagen_hombre_vientos.svg';
import './BarraCategoria.css';
import { Link } from 'react-router-dom';

const BarraCategoria = ({ nombreCategoria }) => {
  const imagenes = {
    Cuerdas: Cuerdas,
    Percusion: Percusion,
    Vientos: Vientos
  };

  const normalizarCadena = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const nombreCategoriaNormalizado = normalizarCadena(nombreCategoria);

  return (
    <div className='Barra-Categoria-container'>
      <div className='barra-categoria-izq'>
        <img className='img-barra-categoria-izq' src={imagenes[nombreCategoriaNormalizado]} alt="imagen-categoria" />
      </div>
      <div className='barra-categoria-cen'>
        <h2>{nombreCategoria}</h2>
      </div>
      <div className='barra-categoria-der'>
        <Link to='/'>
          <h3 className='barra-categoria-atras-text'><MdOutlineArrowBackIosNew /> Atrás</h3>
        </Link>
      </div>
    </div>
  );
};

export default BarraCategoria;
