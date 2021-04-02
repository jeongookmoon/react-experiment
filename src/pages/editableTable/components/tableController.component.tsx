import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

function TableController({
  pageSize,
  setPageSize,
  pageOptions,
  pageIndex,
  gotoPage,
}: {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageOptions: number[];
  pageIndex: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
}): ReactElement {
  return (
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
  );
}

export default TableController;
