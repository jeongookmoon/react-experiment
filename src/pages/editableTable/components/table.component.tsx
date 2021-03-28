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

import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from '../editableTable.style.scss';

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
      <br />
      <Typography variant="subtitle2" style={{ color: 'grey' }}>
        #InlineEdit #Search #ColumnSearch #ColumnSort #Pagination #Navigator
      </Typography>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1em',
        }}
      >
        <Button
          type="button"
          disabled={beginEdit}
          onClick={() => {
            if (selectedRowValues !== undefined) beginEditSet(true);
          }}
        >
          Edit
        </Button>

        <Button
          type="button"
          disabled={!beginEdit}
          onClick={() => {
            beginEditSet(false);
            updateTableData();
            editedRowValuesSet(undefined);
          }}
        >
          Update
        </Button>

        <Button
          type="button"
          disabled={!beginEdit}
          onClick={() => {
            beginEditSet(false);
            editedRowValuesSet(undefined);
          }}
        >
          Cancel
        </Button>

        <SearchComponent filter={globalFilter} filterSet={setGlobalFilter} />
      </div>
      <br />
      <div className={styles.tableWrapper}>
        <MaUTable {...getTableProps()} stickyHeader>
          <TableHead>
            {/* Header */}
            {headerGroups.map((aHeaderGroup, trIndex) => (
              <TableRow
                {...aHeaderGroup.getHeaderGroupProps()}
                key={'tableRow' + trIndex}
              >
                {aHeaderGroup.headers.map((aColumn, thIndex) => (
                  <TableCell
                    {...aColumn.getHeaderProps()}
                    key={'tableHeader' + thIndex}
                  >
                    {/* ColumnFilter */}
                    {aColumn.render('Header')}

                    {/* Apply SortByToggle on Span only */}
                    <span {...aColumn.getSortByToggleProps()}>
                      {aColumn.isSorted
                        ? aColumn.isSortedDesc
                          ? ' 🡦'
                          : ' 🡥'
                        : aColumn.canSort
                        ? ' ⥯'
                        : ''}
                    </span>
                    <span>
                      {aColumn.id === 'gender' && aColumn.canFilter
                        ? aColumn.render('Filter')
                        : null}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {/* Body */}
            {page.map((aRow, tbRowIndex) => {
              prepareRow(aRow);
              return (
                <TableRow
                  {...aRow.getRowProps()}
                  key={'tableBodyRow' + tbRowIndex}
                  style={
                    selectedRowId === aRow.id
                      ? {
                          transition: '.2s',
                          backgroundColor: '#f1f5f1',
                          cursor: 'pointer',
                        }
                      : { cursor: 'pointer' }
                  }
                >
                  {aRow.cells.map((aCell, cellIndex) => {
                    return (
                      <TableCell
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
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </div>
      {/* Navigator */}
      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <select
          value={pageSize}
          onChange={event => setPageSize(Number(event.target.value))}
        >
          {[5, 10, 30].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>{' '}
        <Typography variant="subtitle2">
          {pageIndex + 1}/{pageOptions.length}{' '}
        </Typography>
        <span>
          #{' '}
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
            style={{ width: '3em' }}
          />
        </span>
      </div>
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
