import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUsersQuery } from './api/generated/graphql';
import Logout from './Logout';

const User: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { data, loading, error } = useGetUsersQuery({
    variables: {},
  });

  if (isLoading || loading) {
    return <>'loading yeah...'</>;
  }

  if (error) {
    console.log('error', error);
  }

  console.log('data', data);

  return (
    <>
      {isAuthenticated ? (
        <>
          <p>
            <Logout />
          </p>
          <p>users from database:</p>
          <ul>
            {data?.users.map((user, index) => {
              return <li key={index}>hi {user.firstname}</li>;
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default User;
