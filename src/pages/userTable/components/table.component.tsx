import React, { ReactElement, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { GROUPED_COLUMNS } from '../constants/columns';
import MOCK_DATA from '../../../../mock_data/data__id_name_email_gender_ip.json';

function TableComponent(): ReactElement {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {/* Header */}
        {headerGroups.map((aHeaderGroup, trIndex) => (
          <tr
            {...aHeaderGroup.getHeaderGroupProps()}
            key={'tableRow' + trIndex}
          >
            {aHeaderGroup.headers.map((aColumn, thIndex) => (
              <th
                {...aColumn.getHeaderProps(aColumn.getSortByToggleProps())}
                style={{
                  background: 'white',
                  maxWidth: "50px"
                }}
                key={'tableHeader' + thIndex}
              >
                {aColumn.render('Header')}
                <span>
                  {aColumn.isSorted
                    ? aColumn.isSortedDesc
                      ? ' ▼'
                      : ' ▲'
                    : '  '}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {/* Body */}
        {rows.map((aRow, tbRowIndex) => {
          prepareRow(aRow);
          return (
            <tr {...aRow.getRowProps()} key={'tableBodyRow' + tbRowIndex}>
              {aRow.cells.map((aCell, cellIndex) => {
                return (
                  <td {...aCell.getCellProps()} key={'cell' + cellIndex}>
                    {aCell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableComponent;
