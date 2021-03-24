import React from 'react';

export const SearchComponent = ({
  filter,
  filterSet,
}: {
  filter: string;
  filterSet: (filterValue: string) => void;
}): React.ReactElement => {
  return (
    <p>
      Search from all Columns{'(Client-Side): '}
      <input
        value={filter || ''}
        onChange={event => filterSet(event.target.value)}
      />
    </p>
  );
};
