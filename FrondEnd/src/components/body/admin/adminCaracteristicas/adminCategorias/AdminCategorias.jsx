import React, { useState } from 'react';
import Modal from 'react-modal';
import { useApi } from '../../../../context/ApiContext';
import DataTable from 'react-data-table-component';
import { GoPlus } from "react-icons/go";
import imgModal from '../../../../assets/Admin/Admin_Productos/icon-creation-product.png'
import './AdminCategorias.css';
import trashIcon from '../../../../assets/Admin/Admin_Tablas/botonEliminar.svg';
import ImgTrash from "../../../../assets/Admin/Admin_Tablas/trash.png";

const ListaCategorias = () => {
  const { categorias, createCategory, deleteCaracteristic } = useApi();
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    description: '',
    img: null,
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [roleChanged, setRoleChanged] = useState(false); // Nueva variable de estado

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };
  const handleDeleteClick = (id, name, description) => {
    setConfirmDelete({ id, name, description });
  };
  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      const eliminada = await deleteCaracteristic(confirmDelete.id);
      if(eliminada){
        console.log("Categoria Eliminada con exito");
      } else{
        mostrarModalError('No se puede eliminar la categoría porque tiene productos asociados.');
        alert("No se puede eliminar la categoría porque tiene productos asociados.")
      }
      setConfirmDelete(null);
    }
  };

  const mostrarModalError = (mensaje) => {
    setConfirmDelete(null); // Cierra el modal de confirmación si estaba abierto
    // Muestra el modal de error con el mensaje proporcionado
    setConfirmDelete({ error: mensaje });
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

  const CustomActionsCell = ({ id, name, description }) => (
    <div>
      
      
      <button className="icon-button eliminate" onClick={() => handleDeleteClick(id, name, description)}>
        <img src={trashIcon} alt="Eliminar" />
      </button>
    </div>
  );

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
      cell: CustomActionsCell,
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
      {confirmDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        {confirmDelete.error ? (
                            // Modal de error
                            <>
                                <p>{confirmDelete.error}</p>
                                <button onClick={() => setConfirmDelete(null)}>Cerrar</button>
                            </>
                        ) : (
                            // Modal de confirmación de eliminación
                            <>
                                <img className="img-modal" src={ImgTrash} alt="" />
                                <p className="text-modal">{`¿Estás seguro que deseas eliminar la Categoria? "${confirmDelete.name}"?`}</p>
                                <div className="modal-content">
                                    <div className="modal-buttons">
                                        <button className="izq" onClick={handleConfirmDelete}>Eliminar</button>
                                        <button className="der" onClick={() => setConfirmDelete(null)}>Cancelar</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
    </div>
  );
};

export default ListaCategorias;
