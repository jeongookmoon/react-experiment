import { Button } from '@material-ui/core';
import React, { ReactElement } from 'react';

function NavigatorComponent({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
}: {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </Button>{' '}
      <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </Button>{' '}
      <Button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </Button>{' '}
      <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </Button>
    </div>
  );
}
export default NavigatorComponent;
