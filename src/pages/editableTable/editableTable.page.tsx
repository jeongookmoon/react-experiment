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
import {
  defaultJobsStatus,
  rowProps,
} from './types/tableTypesAndDefaultValues';
import MOCK_DATA from '../../../mock_data/data__id_name_email_gender_ip.json';
import { GROUPED_COLUMNS } from './constants/columns';
import { ColumnFilter } from './components/tableComponent/subComponent/columnFilter.component';
import { EditableCell } from './components/tableComponent/subComponent/editableCell.component';
import NavigatorComponent from './components/navigator.component';
import TableController from './components/tableController.component';
import { NON_SELECTED } from './constants/tableGeneral';
import VerticalSpacing from '../../globals/component';

const isAnyJobInProcess = (obj: typeof defaultJobsStatus): boolean =>
  Object.keys(obj).some(key => obj[key as keyof typeof defaultJobsStatus]);

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

  const [data, dataSet] = useState(mockData);
  const [jobsStatus, jobsStatusSet] = useState(defaultJobsStatus);

  const [selectedRowId, selectedRowIdSet] = useState(NON_SELECTED);
  const [selectedRowValues, selectedRowValuesSet] = useState<
    rowProps | undefined
  >(undefined);

  const [editedRowValues, editedRowValuesSet] = useState<rowProps | undefined>(
    undefined
  );
  const [addedRow, addedRowSet] = useState<rowProps[] | undefined>(undefined);

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

  const updateOrKeepEditedRowData = ({
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
        editedRowValuesSet={editedRowValuesSet}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <VerticalSpacing />

      <div className={styles.tableWrapper}>
        <TableComponent
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
          page={page}
          selectedRowId={selectedRowId}
          data={data}
          isAnyJobInProcess={isAnyJobInProcess}
          jobsStatus={jobsStatus}
          jobsStatusSet={jobsStatusSet}
          selectedRowIdSet={selectedRowIdSet}
          selectedRowValuesSet={selectedRowValuesSet}
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
              selectedRowId,
              selectedRowValues,
              jobsStatus,
              globalFilter,
              editedRowValues,
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
