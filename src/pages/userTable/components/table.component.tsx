import React, { ReactElement, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { GROUPED_COLUMNS } from '../constants/columns';
import MOCK_DATA from '../../../../mock_data/data__id_name_email_gender_ip.json';
import { SearchComponent } from './search.component';
import { ColumnFilter } from './columnFilter.component';

function TableComponent(): ReactElement {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(
    // pre-requisite to redner('Filter')
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state, // for Global Filter
    setGlobalFilter, // for Global Filter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // pre-requisite to redner('Filter')
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <>
      <SearchComponent filter={globalFilter} filterSet={setGlobalFilter} />
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
                  {...aColumn.getHeaderProps()}
                  style={{
                    background: 'white',
                    maxWidth: '50px',
                  }}
                  key={'tableHeader' + thIndex}
                >
                  <div>
                    {aColumn.canFilter ? aColumn.render('Filter') : null}
                  </div>
                  <div>
                    {aColumn.render('Header')}

                    {/* Apply SortByToggle on Span only */}
                    <span {...aColumn.getSortByToggleProps()}>
                      {aColumn.isSorted
                        ? aColumn.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : aColumn.canSort
                        ? ' 🔃'
                        : ''}
                    </span>
                  </div>
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
    </>
  );
}

export default TableComponent;
