import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import UnknownPage from '../pages/unknown.page';
import EditableTable from '../pages/editableTable/editableTable';
import { Typography } from '@material-ui/core';

function MainRoute(): ReactElement {
  return (
    <Router>
      <div style={{ backgroundColor: '#f1f5f1', height: '3em' }}>
        <Link
          to="/"
          style={{ textDecoration: 'none', color: 'grey', cursor: 'pointer' }}
        >
          <Typography>InlineEditTable</Typography>
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <EditableTable />
        </Route>
        <Route>
          <UnknownPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default MainRoute;
