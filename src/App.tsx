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

    const checkForValidJWT = async () => {
      const token = sessionStorage.getItem('jwtToken');

      if (!token) return setIsAuthenticated(false);

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      try {
        const isAuthenticated = await axios.get(
          'http://localhost:3000/isAuthenticated',
          {
            headers,
          },
        );
        if (isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('error', error);
        setIsAuthenticated(false);
        window.sessionStorage.removeItem('jwtToken');
      }
    };

    checkForValidJWT();
  }, [setIsAuthenticated]);

  console.log('isAuthenticated', isAuthenticated);

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
