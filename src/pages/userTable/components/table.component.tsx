import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  Hooks,
} from 'react-table';
import { GROUPED_COLUMNS } from '../constants/columns';
import MOCK_DATA from '../../../../mock_data/data__id_name_email_gender_ip.json';
import { SearchComponent } from './search.component';
import { ColumnFilter } from './columnFilter.component';

type typeRowValues = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
};
const NON_SELECTED = 'none-selected';
const PRIMARY_KEY = 'id';

function TableComponent(): ReactElement {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const mockData = useMemo(() => MOCK_DATA, []);

  const [selectedRowId, selectedRowIdSet] = useState(NON_SELECTED);
  const [selectedRowValues, selectedRowValuesSet] = useState<
    typeRowValues | undefined
  >(undefined);
  const [beginEdit, beginEditSet] = useState(false);
  const [data, dataSet] = useState(mockData);
  const [editedRowValues, editedRowValuesSet] = useState<
    typeRowValues | undefined
  >(undefined);

  const updateTableData = () => {
    if (editedRowValues) {
      dataSet(
        data.map((row, index) => {
          if (index === Number(editedRowValues.id) - 1) {
            return editedRowValues;
          }
          return row;
        })
      );
    }
  };

  const updateEditedRowData = ({
    rowValues,
    columnId,
    cellValue,
  }: // TODO: put explicit type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Hooks<any>): void => {
    const newData = editedRowValues
      ? { ...editedRowValues, [columnId]: cellValue }
      : { ...rowValues, [columnId]: cellValue };

    editedRowValuesSet(newData);
  };

  const EditableCell = ({
    value: initialCellValue,
    row: { index, values },
    column: { id },
    updateEditedRowData,
  }: {
    value: string;
    row: { index: number; values: typeRowValues };
    column: { id: string };
    updateEditedRowData: ({
      rowId,
      rowValues,
      columnId,
      cellValue,
    }: {
      rowId: number;
      rowValues: typeRowValues;
      columnId: string;
      cellValue: string;
    }) => void;
  }) => {
    const [cellValue, cellValueSet] = useState(initialCellValue);
    const parame = {
      rowId: index,
      rowValues: values,
      columnId: id,
      cellValue,
    };

    useEffect(() => {
      cellValueSet(initialCellValue);
    }, [initialCellValue]);

    return (
      <input
        value={cellValue}
        onChange={event => {
          cellValueSet(event.target.value);
        }}
        onBlur={() => updateEditedRowData(parame)} // set new row data
      />
    );
  };

  const defaultColumn = useMemo(
    // defines component for render; ex) aColumn.render('Filter') => ColumnFilter component rendered
    () => ({
      Filter: ColumnFilter,
      Cell: EditableCell,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter, // for Global Filter
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // custom component
      updateEditedRowData, // custom function
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <p>
        #GlobalSearch, #InlineEdit, #ColumnSorting, #ColumnSearch, #Pagination,
        #PageNavigator{' '}
      </p>
      <button
        type="button"
        disabled={beginEdit}
        onClick={() => {
          if (selectedRowValues !== undefined) beginEditSet(true);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        disabled={!beginEdit}
        onClick={() => {
          beginEditSet(false);
          updateTableData();
          editedRowValuesSet(undefined);
        }}
      >
        Update
      </button>
      <button
        type="button"
        disabled={!beginEdit}
        onClick={() => {
          beginEditSet(false);
          editedRowValuesSet(undefined);
        }}
      >
        Cancel
      </button>
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
                  }}
                  key={'tableHeader' + thIndex}
                >
                  {/* ColumnFilter */}
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
                    <span>
                      {aColumn.id === 'gender' && aColumn.canFilter
                        ? aColumn.render('Filter')
                        : null}
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
              <tr
                {...aRow.getRowProps()}
                key={'tableBodyRow' + tbRowIndex}
                style={
                  selectedRowId === aRow.id
                    ? {
                        transition: '.2s',
                        backgroundColor: 'skyblue',
                        cursor: 'pointer',
                      }
                    : { backgroundColor: 'white', cursor: 'pointer' }
                }
              >
                {aRow.cells.map((aCell, cellIndex) => {
                  return (
                    <td
                      {...aCell.getCellProps()}
                      key={'cell' + cellIndex}
                      onClick={() => {
                        let rowId = aCell.row.id;
                        let rowValues: typeRowValues | undefined = aCell.row
                          .values as typeRowValues;

                        if (beginEdit) {
                          if (selectedRowId !== aCell.row.id) {
                            beginEditSet(false);
                          }
                        } else {
                          rowId =
                            selectedRowId === aCell.row.id
                              ? NON_SELECTED
                              : aCell.row.id;

                          rowValues =
                            selectedRowId === aCell.row.id
                              ? undefined
                              : (aCell.row.values as typeRowValues);
                        }

                        selectedRowIdSet(rowId);
                        selectedRowValuesSet(rowValues as typeRowValues);
                      }}
                    >
                      {beginEdit &&
                      selectedRowId === aCell.row.id &&
                      aCell.column.id !== PRIMARY_KEY ? (
                        aCell.render('Cell')
                      ) : (
                        <div>{aCell.value}</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {/* Navigator */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        Go to page:{' '}
        <input
          type="number"
          value={pageIndex + 1}
          onChange={event => {
            const pageNumber = event.target.value
              ? Number(event.target.value) - 1
              : 0;
            gotoPage(pageNumber);
          }}
          min={1}
          max={pageOptions.length}
        />{' '}
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}{' '}
        </strong>
      </div>
      <div style={{ textAlign: 'center' }}>
        <br /># of Rows per Page{' '}
        <select
          value={pageSize}
          onChange={event => setPageSize(Number(event.target.value))}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>{' '}
      </div>
      <br />
      <br />
      <p>States:</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowId,
              selectedRowValues,
              beginEdit,
              globalFilter,
              editedRowValues,
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

export default TableComponent;
