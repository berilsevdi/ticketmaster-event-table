import React from "react";
import './Table.css';

const Table = ({ columns, data, onSort, sortField, sortDirection }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              onClick={() => column.sortable ? onSort(column.accessor) : null}
              style={{ cursor: column.sortable ? 'pointer' : 'default' }}
            >
              {column.label}{" "}
              {sortField === column.accessor
                ? sortDirection === 'asc' ? '↑' : '↓'
                : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>Oops! No data available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
