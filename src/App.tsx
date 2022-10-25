import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import User from './User';
import Login from './Login';
import { isAuthenticatedState } from './atom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  useEffect(() => {
    console.log('useEffect');
    const token = sessionStorage.getItem('jwtToken');

    if (!token) return setIsAuthenticated(false);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    axios
      .get('http://localhost:3000/isAuthenticated', {
        headers,
      })
      .then((res: any) => {
        console.log('res', res);
        if (res.data) {
          setIsAuthenticated(true);
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsAuthenticated(false);
        window.sessionStorage.removeItem('jwtToken');
      });
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
