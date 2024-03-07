import React from 'react'
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useApi } from '../../../../../context/ApiContext';
import editIcon from '../../../../../assets/Admin/Admin_Tablas/botonEditar.svg'
import trashIcon from '../../../../../assets/Admin/Admin_Tablas/botonEliminar.svg';
import { ImPlus } from "react-icons/im";
import { Link } from "react-router-dom"; 
import './AdminFeatures.css'
import { IoChevronBack } from "react-icons/io5";
import ImgTrash from "../../../../../assets/Admin/Admin_Tablas/trash.png";
import { useNavigate } from 'react-router-dom'

const AdminFeatures = () => {
    const { caracteristicas, loading, error, deleteFeature, createFeature, fetchFeatureById} = useApi();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmEdit, setConfirmEdit] = useState(null);

  const navigate = useNavigate();

  const handleDeleteClick = (id, name, icon) => {
    setConfirmDelete({ id, name, icon });
  };
  const handleEditClick = (id, name, icon) => {
    setConfirmEdit({ id, name, icon });
  };
  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      await deleteFeature(confirmDelete.id);
      setConfirmDelete(null);
    }
  };
  const CustomActionsCell = ({ id, name, icon }) => (
    <div>
      
      <button className="icon-button eliminate" onClick={() => navigate("/admin/Administrar-Caracteristicas/:id")}>
        <img src={editIcon} alt="Editar" />
      </button>
      <button className="icon-button eliminate" onClick={() => handleDeleteClick(id, name, icon)}>
        <img src={trashIcon} alt="Eliminar" />
      </button>
    </div>
  );
  const columns = [  
    {
        name: "Icono",
        selector: (row) => row.icon[0].imageData,
      cell: ({ icon }) => (
        <div className="image-column">
          {icon && icon.length > 0 && (
            <img
              src={`data:image/jpeg;base64,${icon[0].imageData}`}
              alt="Imagen"
              style={{ width: '50px' }}
            />
          )}
        </div>
      ),
    },
      
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre de Característica",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Acción',
      cell: CustomActionsCell,
    },
  ];
  return (
    <div className="table-container">
      <h1 className="text-admin-products">Permite añadir o quitar características</h1>

      <div className="contenedor-botones">
        <Link to="/admin" className="link-boton">
          <button className="add-button">
            <p><IoChevronBack style={{ margin: '0 6px' }}/></p>
            <p>Regresar</p>
          </button>
        </Link>
        <Link to="/admin/Administrar-Caracteristicas/crear-nueva" className="link-boton">
          <button className="add-button">
            <p><ImPlus style={{ margin: '0 6px' }}/></p>
            <p>Añadir nueva</p>
          </button>
        </Link>
      </div>
      {loading && <p>Cargando características...</p>}
      {error && <p>Error al cargar características: {error}</p>}

      <DataTable
        columns={columns}
        data={caracteristicas}
        selectableRows
        striped
        pagination
      />

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <img className="img-modal" src={ImgTrash} alt="" />
            <p className="text-modal" >{`¿Estas seguro que deseas eliminar la características? "${confirmDelete.name}?"`}</p>
            <div className="modal-content">              
              <div className="modal-buttons">
                <button className="izq" onClick={handleConfirmDelete}>Eliminar</button>
                <button className="der" onClick={() => setConfirmDelete(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminFeatures