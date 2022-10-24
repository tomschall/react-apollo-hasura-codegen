import React from 'react';
import axios from 'axios';
import { isAuthenticatedState } from './atom';
import { useRecoilState } from 'recoil';

const Login: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  const headers = {
    'Content-Type': 'application/json',
  };

  const data = {
    username: 'roli',
    password: 'fickenwiedermaltest',
  };

  const login = async () => {
    axios
      .post('http://localhost:3000/auth/login', data, {
        headers: headers,
      })
      .then((res: any) => {
        console.log('res', res);
        if (res.data.access_token) {
          sessionStorage.setItem('jwtToken', res.data.access_token);
          setIsAuthenticated(true);
        }
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  return (
    <>
      <button onClick={login} aria-label="Login">
        Login
      </button>
    </>
  );
};

export default Login;
