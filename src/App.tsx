import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import User from './User';
import Login from './Login';
import Sign from './Sign';
import { isAuthenticatedState } from './atom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  useEffect(() => {
    console.log('useEffect');

    const checkForValidJWT = async () => {
      let token = sessionStorage.getItem('jwtToken');

      if (token) {
        try {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          };

          const isAuthenticated = await axios.get(
            'http://localhost:3000/auth/isAuthenticated',
            {
              headers,
            },
          );

          console.log('isAuthenticated response', isAuthenticated);

          if (isAuthenticated) {
            setIsAuthenticated(true);
            return;
          }
        } catch (err) {
          console.log('err', err);
        }
      }

      try {
        const headers = {
          'Content-Type': 'application/json',
        };

        const tokens = await axios.get('http://localhost:3000/auth/refresh', {
          headers,
          withCredentials: true,
        });

        if (tokens) {
          console.log('tokens', tokens);
          sessionStorage.setItem('jwtToken', tokens.data);
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        console.log('refresh tokens error');
        console.log('error', error);
        setIsAuthenticated(false);
        window.sessionStorage.clear();
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
          <Route path="/signup" component={Sign} />
          <Route path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      )}
    </>
  );
};

export default App;
