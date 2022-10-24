import React from 'react';
import { useUsersSubscription } from './api/generated/graphql';
import Logout from './Logout';
import { useRecoilState } from 'recoil';
import { isAuthenticatedState } from './atom';

const User: React.FC = () => {
  const [isAuthenticated] = useRecoilState(isAuthenticatedState);

  const { data, loading, error } = useUsersSubscription({
    variables: {},
  });

  if (loading) {
    return <>'loading yeah...'</>;
  }

  if (error) {
    console.log('error', error);
  }

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
