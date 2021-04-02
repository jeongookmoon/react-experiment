import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { rowProps } from '../../../types/tableTypesAndDefaultValues';

function EditableCellForAdd({
  initialCellValue,
  cellKey,
  addedRowSet,
}: {
  initialCellValue: string;
  cellKey: keyof rowProps;
  addedRowSet: Dispatch<SetStateAction<rowProps>>;
}): ReactElement {
  const [cellValue, cellValueSet] = useState(initialCellValue);
  return (
    <input
      value={cellValue}
      onChange={event => {
        cellValueSet(event.target.value);
      }}
      onBlur={() =>
        addedRowSet(prev => {
          return { ...prev, [cellKey]: cellValue };
        })
      }
    />
  );
}

export default EditableCellForAdd;
