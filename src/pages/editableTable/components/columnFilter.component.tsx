import React, { ReactElement } from 'react';
import { FilterProps } from 'react-table';

// TODO: Findout proper type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ColumnFilter = ({ column }: FilterProps<any>): ReactElement => {
  const {
    filterValue,
    setFilter,
  }: { filterValue: string; setFilter: (filterValue: string) => void } = column;
  return (
    <span>
      <input
        value={filterValue || ''}
        onChange={event => setFilter(event.target.value)}
        style={{ maxWidth: '50%', textAlign: 'center' }}
        placeholder="Column Filter"
      />
    </span>
  );
};
