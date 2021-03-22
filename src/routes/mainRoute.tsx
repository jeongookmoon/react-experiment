import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MainPage from '../pages/main.page';
import UnknownPage from '../pages/unknown.page';
import UserTablePage from '../pages/userTable/userTable.page';

function MainRoute(): ReactElement {
  return (
    <Router>
      <Link to="/">Main</Link>
      <br />
      <Link to="/userTable">UserTable</Link>
      <hr />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/userTable">
          <UserTablePage />
        </Route>
        <Route>
          <UnknownPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default MainRoute;
