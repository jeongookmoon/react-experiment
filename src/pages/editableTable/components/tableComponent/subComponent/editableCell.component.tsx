import React, { ReactElement, useEffect, useState } from 'react';
import { rowProps } from '../../../types/tableTypesAndDefaultValues';

export const EditableCell = ({
  value: initialCellValue,
  row: { index, values },
  column: { id },
  updateOrKeepEditedRowData,
}: {
  value: string;
  row: { index: number; values: rowProps };
  column: { id: string };
  updateOrKeepEditedRowData: ({
    rowId,
    rowValues,
    columnId,
    cellValue,
  }: {
    rowId: number;
    rowValues: rowProps;
    columnId: string;
    cellValue: string;
  }) => void;
}): ReactElement => {
  const [cellValue, cellValueSet] = useState(initialCellValue);
  const newEditedRowData = {
    rowId: index,
    rowValues: values,
    columnId: id,
    cellValue,
  };

  useEffect(() => {
    cellValueSet(initialCellValue);
  }, [initialCellValue]);

  return (
    <input
      value={cellValue}
      onChange={event => {
        cellValueSet(event.target.value);
      }}
      onBlur={() => updateOrKeepEditedRowData(newEditedRowData)} // set new row data
    />
  );
};
