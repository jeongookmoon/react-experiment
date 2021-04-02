import { Button } from '@material-ui/core';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  defaultJobsStatus,
  rowProps,
} from '../types/tableTypesAndDefaultValues';
import { SearchComponent } from './tableComponent/subComponent/search.component';

function TableMenuComponent({
  isAnyJobInProcess,
  jobsStatus,
  jobsStatusSet,
  selectedRowValues,
  updateTableData,
  editedRowValuesSet,
  globalFilter,
  setGlobalFilter,
}: {
  isAnyJobInProcess: (obj: typeof defaultJobsStatus) => boolean;
  jobsStatus: typeof defaultJobsStatus;
  jobsStatusSet: Dispatch<SetStateAction<typeof defaultJobsStatus>>;
  selectedRowValues: rowProps | undefined;
  updateTableData: () => void;
  editedRowValuesSet: Dispatch<SetStateAction<rowProps | undefined>>;
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
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
          if (selectedRowValues !== undefined)
            jobsStatusSet(prev => {
              return { ...prev, add: true };
            });
        }}
      >
        Add
      </Button>

      <Button
        type="button"
        disabled={isAnyJobInProcess(jobsStatus)}
        onClick={() => {
          if (selectedRowValues !== undefined)
            jobsStatusSet(prev => {
              return { ...prev, edit: true };
            });
        }}
      >
        Edit
      </Button>

      {/* <Button
          type="button"
          disabled={beginEdit}
          onClick={() => {
            if (selectedRowValues !== undefined) beginEditSet(true);
          }}
        >
          Delete
        </Button> */}

      <Button
        type="button"
        disabled={jobsStatus.edit || jobsStatus.add}
        onClick={() => {
          jobsStatusSet(prev => {
            return { ...prev, edit: false };
          });
          updateTableData();
          editedRowValuesSet(undefined);
        }}
      >
        Update
      </Button>

      <Button
        type="button"
        disabled={!jobsStatus.edit}
        onClick={() => {
          jobsStatusSet(prev => {
            return { ...prev, edit: false };
          });
          editedRowValuesSet(undefined);
        }}
      >
        Cancel
      </Button>

      <SearchComponent filter={globalFilter} filterSet={setGlobalFilter} />
    </div>
  );
}

export default TableMenuComponent;
