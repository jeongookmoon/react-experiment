import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { rowProps } from '../../../constants/types';

function EditableCellForAdd({
  initialCellValue,
  cellKey,
  newRowSet,
}: {
  initialCellValue: string;
  cellKey: keyof rowProps;
  newRowSet: Dispatch<SetStateAction<rowProps | undefined>>;
}): ReactElement {
  const [cellValue, cellValueSet] = useState(initialCellValue);
  return (
    <input
      value={cellValue}
      onChange={event => {
        cellValueSet(event.target.value);
      }}
      onBlur={() =>
        newRowSet(prev => {
          if (prev) return { ...prev, [cellKey]: cellValue };
          else throw new Error(`EditableCellForAdd prev: ${prev} not defined`);
        })
      }
    />
  );
}

export default EditableCellForAdd;
