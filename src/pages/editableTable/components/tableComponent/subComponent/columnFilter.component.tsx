import { TextField, ThemeProvider } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { FilterProps } from 'react-table';
import { materialTheme } from '../../../constants/constants';

// TODO: Findout proper type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ColumnFilter = ({ column }: FilterProps<any>): ReactElement => {
  const {
    filterValue,
    setFilter,
  }: { filterValue: string; setFilter: (filterValue: string) => void } = column;
  return (
    <span>
      {' '}
      <ThemeProvider theme={materialTheme}>
        <TextField
          value={filterValue || ''}
          onChange={event => setFilter(event.target.value)}
          style={{ maxWidth: '50%', textAlign: 'center' }}
          placeholder="Column Filter"
          size="small"
        />
      </ThemeProvider>
    </span>
  );
};
