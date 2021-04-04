import React, { ReactElement, useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  Hooks,
} from 'react-table';
import HashTagHeader from './components/hashTagsHeader.component';
import TableComponent from './components/tableComponent/table.component';
import TableMenuComponent from './components/tableMenu.component';
import styles from './editableTable.style.scss';
import { jobsStatusType, rowProps } from './constants/types';
import MOCK_DATA from '../../../mock_data/data__id_name_email_gender_ip.json';
import { GROUPED_COLUMNS } from './constants/columns';
import { ColumnFilter } from './components/tableComponent/subComponent/columnFilter.component';
import { EditableCell } from './components/tableComponent/subComponent/editableCell.component';
import NavigatorComponent from './components/navigator.component';
import TableController from './components/tableController.component';
import VerticalSpacing from '../../globals/component';

const isAnyJobInProcess = (jobsStatus: jobsStatusType): boolean =>
  jobsStatus !== undefined;

function EditableTable(): ReactElement {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const mockData = useMemo(() => MOCK_DATA, []);
  const defaultColumn = useMemo(
    // defines component for render; ex) aColumn.render('Filter') => ColumnFilter component rendered
    () => ({
      Filter: ColumnFilter,
      EditableCell: EditableCell,
    }),
    []
  );

  const [data, dataSet] = useState(mockData as rowProps[]);
  const [jobsStatus, jobsStatusSet] = useState<jobsStatusType>(undefined);
  const [selectedRowValues, selectedRowValuesSet] = useState<
    rowProps | undefined
  >(undefined);

  const [editedRow, editedRowSet] = useState<rowProps | undefined>(undefined);
  const [newRow, newRowSet] = useState<rowProps | undefined>(undefined);

  const updateOrKeepEditedRowData = ({
    rowValues,
    columnId,
    cellValue,
  }: // TODO: put explicit type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Hooks<any>): void => {
    const newData = editedRow
      ? { ...editedRow, [columnId]: cellValue }
      : { ...rowValues, [columnId]: cellValue };

    editedRowSet(newData);
  };

  const initNewRow = () => {
    newRowSet({
      id: data.length + 1,
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      ip_address: '',
    });
  };

  const removeNewRow = () => {
    newRowSet(undefined);
  };

  // CRUD operations:
  const addNewRow = () => {
    // make /add mutation -> refetch to update data
    if (newRow) dataSet(data.concat(newRow));
  };

  const updateTableData = () => {
    // make /edit mutation -> refetch to update data
    if (editedRow) {
      dataSet(
        data.map((row, index) => {
          if (index === editedRow.id - 1) {
            return editedRow;
          }
          return row;
        })
      );
    }
  };

  const deleteRow = () => {
    // make /delete mutation -> refetch to update data
    if (editedRow) {
      dataSet(prev => {
        return prev.filter(eachRow => eachRow.id !== editedRow.id);
      });
    }
  };

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
      updateOrKeepEditedRowData, // custom function
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className={styles.editableTablePage}>
      <HashTagHeader />

      <TableMenuComponent
        isAnyJobInProcess={isAnyJobInProcess}
        jobsStatus={jobsStatus}
        jobsStatusSet={jobsStatusSet}
        selectedRowValues={selectedRowValues}
        updateTableData={updateTableData}
        selectedRowValuesSet={selectedRowValuesSet}
        editedRowSet={editedRowSet}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        initNewRow={initNewRow}
        removeNewRow={removeNewRow}
        addNewRow={addNewRow}
        deleteRow={deleteRow}
      />
      <VerticalSpacing />

      <div className={styles.tableWrapper}>
        <TableComponent
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
          page={page}
          jobsStatus={jobsStatus}
          jobsStatusSet={jobsStatusSet}
          selectedRowValues={selectedRowValues}
          selectedRowValuesSet={selectedRowValuesSet}
          newRow={newRow}
          newRowSet={newRowSet}
        />
      </div>

      <NavigatorComponent
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
      />

      <TableController
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageOptions={pageOptions}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
      />

      <pre>
        <code>
          {JSON.stringify(
            {
              newRow,
              selectedRowValues,
              jobsStatus,
              globalFilter,
              editedRow,
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
}

export default EditableTable;
