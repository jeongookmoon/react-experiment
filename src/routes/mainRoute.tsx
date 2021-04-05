import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UnknownPage from '../pages/unknown.page';
import EditableTable from '../pages/editableTable/editableTable.page';
import TopNavBar from '../components/topNavbar.component';

function MainRoute(): ReactElement {
  return (
    <Router>
      <TopNavBar />
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
