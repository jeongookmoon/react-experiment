import React, { ReactElement, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
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
    prepareRow,
    state, // for Global Filter
    setGlobalFilter, // for Global Filter
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // pre-requisite to redner('Filter')
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

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
          {page.map((aRow, tbRowIndex) => {
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
      <div>
        <br />
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}{' '}
          </strong>
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={event => {
              const pageNumber = event.target.value
                ? Number(event.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
            min={1}
            max={pageOptions.length}
          />{' '}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </>
  );
}

export default TableComponent;
