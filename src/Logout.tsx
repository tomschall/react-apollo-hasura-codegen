import React from 'react';
import { useRecoilState } from 'recoil';
import { isAuthenticatedState } from './atom';

const Logout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);

  return (
    <>
      <button
        onClick={() => {
          setIsAuthenticated(false);
          window.sessionStorage.clear();
        }}
        aria-label="Logout"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
