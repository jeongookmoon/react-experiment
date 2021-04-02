import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';

import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {
  rowProps,
  defaultJobsStatus,
} from '../../types/tableTypesAndDefaultValues';
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TablePropGetter,
  TableProps,
} from 'react-table';
import { IColumn } from '../../constants/columns';
import { NON_SELECTED, PRIMARY_KEY } from '../../constants/tableGeneral';
import { EditableCell } from './subComponent/editableCell.component';
import EditableCellForAdd from './subComponent/editableCellForAdd.component.';

function TableComponent({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  selectedRowId,
  data,
  isAnyJobInProcess,
  jobsStatus,
  jobsStatusSet,
  selectedRowIdSet,
  selectedRowValuesSet,
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
  selectedRowId: string;
  data: IColumn[];
  isAnyJobInProcess: (obj: typeof defaultJobsStatus) => boolean;
  jobsStatus: typeof defaultJobsStatus;
  jobsStatusSet: Dispatch<SetStateAction<typeof defaultJobsStatus>>;
  selectedRowIdSet: Dispatch<SetStateAction<string>>;
  selectedRowValuesSet: Dispatch<SetStateAction<rowProps | undefined>>;
}): ReactElement {
  const sample: rowProps = {
    id: (Object.keys(data).length + 1) as number,
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    ip_address: '',
  };
  const [addedRow, addedRowSet] = useState(sample);
  console.log('addedRow', addedRow);
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
          {addedRow &&
            Object.keys(sample).map((aKey, index) => {
              return (
                <TableCell key={'newRow' + index.toString()}>
                  {aKey === PRIMARY_KEY ? (
                    <div>{sample[aKey]}</div>
                  ) : (
                    <EditableCellForAdd
                      initialCellValue={
                        sample[aKey as keyof rowProps] as string
                      }
                      cellKey={aKey as keyof rowProps}
                      addedRowSet={addedRowSet}
                    />
                  )}
                </TableCell>
              );
            })}
        </TableRow>
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
                      let rowValues: rowProps | undefined = aCell.row
                        .values as rowProps;

                      // case: during any job in process & click on non-selected cell -> cancel job
                      if (isAnyJobInProcess(jobsStatus)) {
                        // case: click on selected cell -> do nothing
                        // case: click on non-selected cell -> cancel jobs, select id& value
                        if (selectedRowId !== aCell.row.id)
                          jobsStatusSet(defaultJobsStatus);
                      }
                      // case: no job in process
                      else {
                        // case: click on selected cell and no job in process-> deselected id & value
                        // case: click on non-selected cell -> select id & value
                        rowId =
                          selectedRowId === aCell.row.id
                            ? NON_SELECTED
                            : aCell.row.id;

                        rowValues =
                          selectedRowId === aCell.row.id
                            ? undefined
                            : (aCell.row.values as rowProps);
                      }

                      selectedRowIdSet(rowId);
                      selectedRowValuesSet(rowValues);
                    }}
                  >
                    {jobsStatus.edit &&
                    selectedRowId === aCell.row.id &&
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
