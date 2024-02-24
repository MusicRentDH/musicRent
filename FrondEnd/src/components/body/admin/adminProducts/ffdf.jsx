// AdminProducts.js

import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../../../context/ApiContext";
import editIcon from '../../../../assets/Admin/Admin_Tablas/botonEditar.svg';
import trashIcon from '../../../../assets/Admin/Admin_Tablas/botonEliminar.svg';
import { ImPlus } from "react-icons/im";
import './AdminProducts.css';

const AdminProducts = () => {
  const { productos, loading, error, deleteProduct, createProduct } = useApi();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: ''   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setCreateForm((prevForm) => ({ ...prevForm, images }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para enviar el formulario al servidor
    await createProduct(createForm);

    // Limpiar el formulario después de la creación
    setCreateForm({
      name: '',
      price: '',
      description: '',
      categoryId: '',
      images: [],
    });

    // Cerrar el modal después de la creación
    setCreateModalVisible(false);
  };

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

  const columns = [
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
      <h1 className="text-admin-products">Administra, crea y elimina instrumentos musicales</h1>

      <button className="add-button" onClick={() => setCreateModalVisible(true)}>
        <p><ImPlus style={{ margin: '0 6px' }}/></p>
        <p>Agregar Instrumento</p>
      </button>

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}

      <DataTable
        columns={columns}
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

      {createModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <label>
                Nombre del producto:
                <input
                  type="text"
                  name="name"
                  value={createForm.name}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Precio:
                <input
                  type="text"
                  name="price"
                  value={createForm.price}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Descripción:
                <input
                  type="text"
                  name="description"
                  value={createForm.description}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Categoría ID:
                <input
                  type="text"
                  name="categoryId"
                  value={createForm.categoryId}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Imágenes:
                <input
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                />
              </label>

              <button type="submit">Agregar Producto</button>
            </form>

            <button onClick={() => setCreateModalVisible(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
