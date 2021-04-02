import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

function HashTagHeader(): ReactElement {
  return (
    <Typography variant="subtitle2" style={{ color: 'grey' }}>
      #InlineEdit #Search #ColumnSearch #ColumnSort #Pagination #Navigator
    </Typography>
  );
}

export default HashTagHeader;
