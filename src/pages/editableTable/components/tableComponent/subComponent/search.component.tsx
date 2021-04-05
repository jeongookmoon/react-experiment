import React from 'react';
import TextField from '@material-ui/core/TextField';
import { materialTheme } from '../../../constants/constants';
import { ThemeProvider } from '@material-ui/core';

const SearchComponent = ({
  filter,
  filterSet,
}: {
  filter: string;
  filterSet: (filterValue: string) => void;
}): React.ReactElement => {
  return (
    <ThemeProvider theme={materialTheme}>
      <TextField
        value={filter || ''}
        onChange={event => filterSet(event.target.value)}
        size="small"
        label="Search All Columns"
        style={{ marginLeft: 'auto' }}
      />
    </ThemeProvider>
  );
};

export default SearchComponent;
