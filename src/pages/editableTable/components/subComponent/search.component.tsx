import React from 'react';
import TextField from '@material-ui/core/TextField';

export const SearchComponent = ({
  filter,
  filterSet,
}: {
  filter: string;
  filterSet: (filterValue: string) => void;
}): React.ReactElement => {
  return (
    <TextField
      value={filter || ''}
      onChange={event => filterSet(event.target.value)}
      size="small"
      label="Search All Columns"
      style={{ marginLeft: 'auto' }}
    />
  );
};
