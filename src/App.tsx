import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import User from './User';
import Login from './Login';

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <>'loading...'</>;
  }

  return (
    <>
      {isAuthenticated ? (
        <Switch>
          <Redirect exact from="/" to="/user" />
          <PrivateRoute path="/user" component={User} />
          <Redirect to="/404-not-found" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      )}
    </>
  );
};

export default App;
