import React, { useState } from 'react';
import Modal from 'react-modal';
import { useApi } from '../../../../context/ApiContext';
import DataTable from 'react-data-table-component';
import { GoPlus } from "react-icons/go";
import imgModal from '../../../../assets/Admin/Admin_Productos/icon-creation-product.png'
import './AdminCategorias.css';

const ListaCategorias = () => {
  const { categorias, createCategory } = useApi();
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    description: '',
    img: null,
  });
  const [roleChanged, setRoleChanged] = useState(false); // Nueva variable de estado

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleAgregarCategoria = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRoleChanged(false); // Resetear roleChanged al cerrar el modal
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setNewCategoryData((prevData) => ({
      ...prevData,
      [name]: name === 'img' ? files[0] : value,
    }));
  };

  const handleGuardarCategoria = async () => {
    try {
      await createCategory(newCategoryData);
      setRoleChanged(true); // Actualizar roleChanged en caso de éxito
    } catch (error) {
      console.error('Error al crear categoría:', error);
      // Manejar errores según sea necesario
    }
  };

  const columns = [
    {
      name: 'Imagen',
      selector: 'img',
      cell: (row) => (
        row.img && (
          <img
            src={`data:image/svg+xml;base64,${row.img}`}
            alt={`Imagen de la categoría ${row.name}`}
          />
        )
      ),
    },
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      filter: true,
    },
    {
      name: 'Nombre',
      cell: (row) => row.name,
      sortable: true,
      filter: true,
    },
    {
      name: 'Descripcion',
      cell: (row) => row.description,
      sortable: true,
      filter: true,
    },
    {
      name: 'Accion',
    },
  ];

  const filteredCategorias = categorias.filter((categoria) => {
    return (
      categoria.id.toString().includes(filtro) ||
      categoria.name.toLowerCase().includes(filtro.toLowerCase()) ||
      categoria.description.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  return (
    <div className='categorias-container-principal-admin'>
      <div className='container-boton-input-categoria'>
        <input
          type='text'
          placeholder='Busca una categoría...'
          value={filtro}
          onChange={handleFiltroChange}
          className='filter-search-bar-admin'
        />
        <button className='boton-admin-categoria' onClick={handleAgregarCategoria}>
          <GoPlus /> Agregar categoría
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredCategorias}
        selectableRows
        striped
        pagination
        paginationPerPage={10}
      />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Felicitaciones Modal"
        className="Modal"
      >
        <div className='modal-categoria-edition'>
          <div className='container-categorias-admin'>
            <h2 className='text-categorias-modal'><GoPlus /> Agregar Categoria</h2>
            <p className='text-categoria-modal-title'>Nombre <span className='spam-categoria'>*</span></p>
            <input
              className='input-modal-categoria'
              type="text"
              placeholder='Cuerdas'
              name="name"
              onChange={handleInputChange}
            />
            <p className='text-categoria-modal-title'>Descripcion <span className='spam-categoria'>*</span></p>
            <input
              className='input-modal-categoria'
              type="text"
              placeholder='Esta cateegoria cuenta con ...'
              name="description"
              onChange={handleInputChange}
            />
            <p className='text-categoria-modal-title'>icono <span className='spam-categoria'>*</span ></p>
            <input
              className='archivo-categoria'
              type="file"
              title='Subir icono'
              name="img"
              onChange={handleInputChange}
            />
          </div>          
          <div className='botones-modal-categoria'>
            <button className='boton-modal-categoria-cerrar' onClick={closeModal}>Cerrar</button>
            <button className='boton-modal-categoria-guardar' onClick={handleGuardarCategoria}>Guardar</button>
          </div>          
        </div>
      </Modal>

      {/* Nuevo Modal */}
      <Modal
        isOpen={showModal && roleChanged}
        onRequestClose={closeModal}
        contentLabel="Felicitaciones Modal"
        className="Modal"
      >
        <div className='modal-user-edition'>
        <img className='img-modal-edition' src={imgModal} alt="" />
          <h4 className='text-modal-user'>Felicitaciones</h4>
          <p className='text-modal-user-p'>¡Has logrado creado una nueva categoria!</p>
          <button className='boton-modal-user' onClick={closeModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ListaCategorias;
