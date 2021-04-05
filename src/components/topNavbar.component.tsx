import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './topNavBar.style.scss';

function TopNavBar(): ReactElement {
  return (
    <div id={styles.topNavBarContainer}>
      <Link to="/" className={styles.noTextDeco}>
        <Typography variant="h6" className={styles.menuButton}>
          InlineEditTable
        </Typography>
      </Link>
    </div>
  );
}

export default TopNavBar;
