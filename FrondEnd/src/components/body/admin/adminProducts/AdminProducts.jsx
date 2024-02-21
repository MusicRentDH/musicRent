// AdminProducts.jsx
import React from 'react';
import { useApi } from '../../../../context/ApiContext';
import { useTable } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminProducts.css'; 

const AdminProducts = () => {
  const { productos } = useApi();
  console.log(productos);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        className: 'id-column',
      },
      {
        Header: 'Imagen',
        accessor: 'images[0].imageData',
        Cell: ({ cell: { value } }) => (
          <img src={`data:image/jpeg;base64,${value}`} alt="Imagen" className="image-cell image-column" />
        ),
        className: 'image-column',
      },
      {
        Header: 'Nombre',
        accessor: 'name',
        className: 'name-column',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
        className: 'description-column',
      },
      {
        Header: 'Categoría',
        accessor: 'categoryName',
        className: 'category-column',
      },
      // Updated "Acción" column with a unique accessor
      {
        Header: 'Acción',
        accessor: 'actionId', // Updated accessor
        Cell: ({ cell: { value } }) => (
          <div className="action-buttons">
            <button className="edit-button">
              <FaEdit color="#E54E13" />
            </button>
            <button className="delete-button">
              <FaTrash color="#E54E13" />
            </button>
          </div>
        ),
        className: 'action-column',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: productos });

  return (
    <div>
      <table {...getTableProps()} className="admin-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="header-cell">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="data-cell">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
