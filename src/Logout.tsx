import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <>
      <button
        onClick={() => {
          logout({
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL,
          });
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
