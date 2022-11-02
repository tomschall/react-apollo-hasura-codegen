import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import User from './User';
import Login from './Login';
import Sign from './Sign';
import { accessTokenState, isAuthenticatedState } from './atom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  const [accessToken, setAccessToken] =
    useRecoilState<string>(accessTokenState);

  useEffect(() => {
    console.log('useEffect');

    const checkForValidJWT = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
        };

        const token = await axios.get('http://localhost:3000/auth/refresh', {
          headers,
          withCredentials: true,
        });

        if (token) {
          console.log('token', token);
          setIsAuthenticated(true);
          setAccessToken(token.data);
          return;
        }
      } catch (error) {
        console.log('refresh tokens error');
        console.log('error', error);
        setIsAuthenticated(false);
      }
    };

    checkForValidJWT();
  }, [setIsAuthenticated, setAccessToken]);

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
