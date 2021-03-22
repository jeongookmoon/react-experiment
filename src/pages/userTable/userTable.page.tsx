import React, { ReactElement } from 'react';
import TableComponent from './components/table.component';
import styles from './userTable.style.scss';

function UserTablePage(): ReactElement {
  return (
    <div className={styles.userTablePage}>
      <TableComponent />
    </div>
  );
}

export default UserTablePage;
