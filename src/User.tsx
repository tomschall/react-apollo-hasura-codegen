import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUsersQuery } from './api/generated/graphql';

const User: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { data, loading, error } = useGetUsersQuery({
    variables: {},
  });

  if (isLoading) {
    return <>'loading yeah...'</>;
  }

  console.log('data', data);

  return (
    <>
      {isAuthenticated ? (
        <>
          users from database:
          {data?.users.map((user) => {
            return <p>hi {user.firstname}</p>;
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default User;
