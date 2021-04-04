import { Button } from '@material-ui/core';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { jobsStatusType, rowProps } from '../constants/types';
import { SearchComponent } from './tableComponent/subComponent/search.component';

function TableMenuComponent({
  isAnyJobInProcess,
  jobsStatus,
  jobsStatusSet,
  selectedRowValues,
  updateTableData,
  selectedRowValuesSet,
  editedRowSet,
  globalFilter,
  setGlobalFilter,
  initNewRow,
  removeNewRow,
  addNewRow,
  deleteRow,
}: {
  isAnyJobInProcess: (jobType: jobsStatusType) => boolean;
  jobsStatus: jobsStatusType;
  jobsStatusSet: Dispatch<SetStateAction<jobsStatusType>>;
  selectedRowValues: rowProps | undefined;
  updateTableData: () => void;
  selectedRowValuesSet: Dispatch<SetStateAction<rowProps | undefined>>;
  editedRowSet: Dispatch<SetStateAction<rowProps | undefined>>;
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
  initNewRow: () => void;
  removeNewRow: () => void;
  addNewRow: () => void;
  deleteRow: () => void;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 1em',
      }}
    >
      <Button
        type="button"
        disabled={isAnyJobInProcess(jobsStatus)}
        onClick={() => {
          jobsStatusSet('add');
          selectedRowValuesSet(undefined);
          initNewRow();
        }}
      >
        Add
      </Button>

      <Button
        type="button"
        disabled={isAnyJobInProcess(jobsStatus)}
        onClick={() => {
          if (selectedRowValues !== undefined) {
            jobsStatusSet('edit');
          }
        }}
      >
        Edit
      </Button>

      <Button
        type="button"
        disabled={!isAnyJobInProcess(jobsStatus)}
        onClick={() => {
          switch (jobsStatus) {
            case 'add':
              addNewRow();
              removeNewRow();
              break;
            case 'edit':
              updateTableData();
              editedRowSet(undefined);
              break;
          }
          jobsStatusSet(undefined);
        }}
      >
        Update
      </Button>

      <Button
        type="button"
        disabled={!isAnyJobInProcess(jobsStatus)}
        onClick={() => {
          jobsStatusSet(undefined);
          editedRowSet(undefined);
          removeNewRow();
        }}
      >
        Cancel
      </Button>

      <Button
        type="button"
        disabled={isAnyJobInProcess(jobsStatus)}
        onClick={() => {
          if (selectedRowValues) {
            deleteRow();
          }
        }}
      >
        Delete
      </Button>

      <SearchComponent filter={globalFilter} filterSet={setGlobalFilter} />
    </div>
  );
}

export default TableMenuComponent;
