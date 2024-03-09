import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal'; 
import { useApi } from '../../../../context/ApiContext';
import './AdminUsuarios.css';
import { Link } from 'react-router-dom';
import imgModal from '../../../../assets/Admin/Admin_Productos/icon-creation-product.png'

const AdminUsuarios = () => {
  const { users, loading, error } = useApi();
  const [editedUsers, setEditedUsers] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [roleChanged, setRoleChanged] = useState(false); // Estado para rastrear si se ha cambiado el rol

  const columns = [
    {
      name: 'Avatar',
      selector: (row) => (
        <div className="avatar-circle">
          {`${row.name.charAt(0)}${row.lastName ? row.lastName.charAt(0) : ''}`}
        </div>
      ),
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: (row) => row.lastName || 'N/A',
      sortable: true,
    },
    {
      name: 'Rol de Usuario',
      selector: (row) => (
        <span>
          {editedUsers[row.id] ? editedUsers[row.id] : row.userRole}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: (row) => (
        <div className="actions-column">
          <label className="switch">
            <input
              type="checkbox"
              checked={editedUsers[row.id] ? editedUsers[row.id] === 'ADMIN' : row.userRole === 'ADMIN'}
              onChange={() => handleRoleChange(row)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      ),
    },
  ];

  const handleRoleChange = async (row) => {
    const newRole = row.userRole === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';

    try {
      setEditedUsers((prevEditedUsers) => ({
        ...prevEditedUsers,
        [row.id]: newRole,
      }));

      const response = await fetch(`http://localhost:8081/users/change-role/${row.email}/${newRole}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setEditedUsers((prevEditedUsers) => ({
          ...prevEditedUsers,
          [row.id]: row.userRole,
        }));
        console.error('Error actualizando el rol del usuario:', response.statusText);
      } else {
        setReloadData(true);
        setRoleChanged(true); // Establecer roleChanged a true cuando el rol se cambie con éxito
        setShowModal(true); // Mostrar el modal
      }
    } catch (error) {
      setEditedUsers((prevEditedUsers) => ({
        ...prevEditedUsers,
        [row.id]: row.userRole,
      }));
      console.error('Error de red:', error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setRoleChanged(false);
  };

  return (
    <div className="admin-usuarios-container">
      <h4 className='text-tabla-useres' >Permite añadir o quitar los permisos de administrador</h4>
      <Link to='/admin'>Atrás</Link>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {users && users.length > 0 && (
        <DataTable
          key={reloadData}
          columns={columns}
          data={users}
          selectableRows          
          striped
          pagination
          className="custom-row custom-table"
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal && roleChanged}
        onRequestClose={closeModal}
        contentLabel="Felicitaciones Modal"
        className="Modal"
      >
        <div className='modal-user-edition'>
          <img className='img-modal-edition' src={imgModal} alt="" />
          <h4 className='text-modal-user'>Felicitaciones</h4>
          <p className='text-modal-user-p'>¡Has cambiado el rol exitosamente!</p>
          <button className='boton-modal-user' onClick={closeModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsuarios;


