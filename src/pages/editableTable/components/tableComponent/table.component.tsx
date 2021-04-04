import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { rowProps, jobsStatusType } from '../../constants/types';
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TablePropGetter,
  TableProps,
} from 'react-table';
import { PRIMARY_KEY } from '../../constants/constants';
import EditableCellForAdd from './subComponent/editableCellForAdd.component.';

function TableComponent({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  jobsStatus,
  jobsStatusSet,
  selectedRowValues,
  selectedRowValuesSet,
  newRow,
  newRowSet,
}: {
  getTableProps: (
    // Switch object with <Record<string, unknown>> throws type error..
    // TODO: switch object with the appropriate type..
    // eslint-disable-next-line @typescript-eslint/ban-types
    propGetter?: TablePropGetter<object> | undefined
  ) => TableProps;
  getTableBodyProps: (
    // eslint-disable-next-line @typescript-eslint/ban-types
    propGetter?: TableBodyPropGetter<object> | undefined
  ) => TableBodyProps;
  // eslint-disable-next-line @typescript-eslint/ban-types
  headerGroups: HeaderGroup<object>[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  prepareRow: (row: Row<object>) => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  page: Row<object>[];
  jobsStatus: jobsStatusType;
  jobsStatusSet: Dispatch<SetStateAction<jobsStatusType>>;
  selectedRowValues: rowProps | undefined;
  selectedRowValuesSet: Dispatch<SetStateAction<rowProps | undefined>>;
  newRow: rowProps | undefined;
  newRowSet: Dispatch<SetStateAction<rowProps | undefined>>;
}): ReactElement {
  const isCurrentRowSelected = (
    rowId: number,
    selectedRowValues: rowProps | undefined
  ) => {
    return selectedRowValues && selectedRowValues.id === rowId;
  };

  const cancelCurrentJobAndSelectTheRow = (
    rowValues: rowProps | undefined
  ): void => {
    jobsStatusSet(undefined);
    selectedRowValuesSet(rowValues);
    newRowSet(undefined);
  };

  return (
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
        <TableRow>
          {newRow &&
            Object.keys(newRow).map((aKey, index) => {
              return (
                <TableCell key={'newRow' + index.toString()}>
                  {aKey === PRIMARY_KEY ? (
                    <div>{newRow[aKey]}</div>
                  ) : (
                    <EditableCellForAdd
                      initialCellValue={
                        newRow[aKey as keyof rowProps] as string
                      }
                      cellKey={aKey as keyof rowProps}
                      newRowSet={newRowSet}
                    />
                  )}
                </TableCell>
              );
            })}
        </TableRow>
        {/* Body */}
        {page.map((aRow, tbRowIndex) => {
          const rowId = parseInt(aRow.id) + 1; // add 1 since rowId starts from 1 instead of 0
          prepareRow(aRow);
          return (
            <TableRow
              {...aRow.getRowProps()}
              key={'tableBodyRow' + tbRowIndex}
              style={
                isCurrentRowSelected(rowId, selectedRowValues)
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
                      switch (jobsStatus) {
                        case 'add':
                        case 'delete':
                          cancelCurrentJobAndSelectTheRow(
                            aCell.row.values as rowProps
                          );
                          break;

                        case 'edit':
                          if (!isCurrentRowSelected(rowId, selectedRowValues))
                            cancelCurrentJobAndSelectTheRow(
                              aCell.row.values as rowProps
                            );
                          break;

                        default:
                          selectedRowValuesSet(
                            isCurrentRowSelected(rowId, selectedRowValues)
                              ? undefined
                              : (aCell.row.values as rowProps)
                          );
                      }
                    }}
                  >
                    {jobsStatus === 'edit' &&
                    isCurrentRowSelected(rowId, selectedRowValues) &&
                    aCell.column.id !== PRIMARY_KEY ? (
                      aCell.render('EditableCell')
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
  );
}

export default TableComponent;
