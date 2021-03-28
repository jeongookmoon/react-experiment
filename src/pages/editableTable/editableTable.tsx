import React, { ReactElement } from 'react';
import TableComponent from './components/table.component';
import styles from './editableTable.style.scss';

function EditableTable(): ReactElement {
  return (
    <div className={styles.editableTablePage}>
      <TableComponent />
    </div>
  );
}

export default EditableTable;
