import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import User from './User';
import Login from './Login';
import { isAuthenticatedState } from './atom';
import { useRecoilState } from 'recoil';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  useEffect(() => {
    const hasToken: boolean = sessionStorage.getItem('jwtToken') ? true : false;
    setIsAuthenticated(hasToken);
  }, [setIsAuthenticated]);

  console.log('isAuthenticated', isAuthenticated);

  // if (isLoading) {
  //   return <>'loading...'</>;
  // }

  return (
    <>
      {isAuthenticated ? (
        <Switch>
          <Redirect exact from="/" to="/user" />
          <Route path="/user" component={User} />
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
