import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { isAuthenticatedState } from './atom';

const Logout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  const logout = () => {
    let token = sessionStorage.getItem('jwtToken');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    axios
      .get('http://localhost:3000/auth/logout', {
        headers: headers,
      })
      .then((res: any) => {
        console.log('logged out', res);
        setIsAuthenticated(false);
        window.sessionStorage.clear();
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  return (
    <>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
