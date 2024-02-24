// AdminProducts.jsx
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../../../context/ApiContext";
import editIcon from '../../../../assets/Admin/Admin_Tablas/botonEditar.svg';
import trashIcon from '../../../../assets/Admin/Admin_Tablas/botonEliminar.svg';
import './AdminProducts.css';

const AdminProducts = () => {
  const { productos, loading, error, deleteProduct } = useApi();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteClick = (id, name, images) => {
    setConfirmDelete({ id, name, images });
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      await deleteProduct(confirmDelete.id);
      setConfirmDelete(null);
    }
  };

  const CustomActionsCell = ({ id, name, images }) => (
    <div>
      <button className="icon-button edit">
        <img src={editIcon} alt="Editar" />
      </button>
      <button className="icon-button eliminate" onClick={() => handleDeleteClick(id, name, images)}>
        <img src={trashIcon} alt="Eliminar" />
      </button>
    </div>
  );

  const columnas = [
    {
      name: 'Imagen',
      selector: (row) => row.images[0].imageData,
      cell: ({ images }) => (
        <div className="image-column">
          {images && images.length > 0 && (
            <img
              src={`data:image/jpeg;base64,${images[0].imageData}`}
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
      name: "Nombre del producto",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: 'Acción',
      cell: CustomActionsCell,
    },
  ];

  return (
    <div>
      <h1>Lista productos</h1>
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      {!loading && !error && (
        <>
          <DataTable
            columns={columnas}
            data={productos}
            selectableRows
            fixedHeader
            striped
            pagination
          />
          {confirmDelete && (
            <div className="modal-overlay">
              <div className="modal">
                <p>{`¿Deseas eliminar el producto con ID ${confirmDelete.id} (${confirmDelete.name})?`}</p>
                <div className="modal-content">
                  <img
                    src={`data:image/jpeg;base64,${confirmDelete.images[0].imageData}`}
                    alt="Imagen del producto"
                    style={{ width: '50px', marginRight: '15px' }}
                  />
                  <div className="modal-buttons">
                    <button onClick={handleConfirmDelete}>Sí</button>
                    <button onClick={() => setConfirmDelete(null)}>No</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProducts;
