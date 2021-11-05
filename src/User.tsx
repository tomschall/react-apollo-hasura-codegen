import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useGetUsersSubscription,
  useSomethingsSubscription,
} from './api/generated/graphql';
import Logout from './Logout';

const User: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { data, loading, error } = useGetUsersSubscription();

  const {
    data: somethingData,
    loading: loadingData,
    error: errorData,
  } = useSomethingsSubscription({});

  if (isLoading || loading || loadingData) {
    return <>'loading yeah...'</>;
  }

  if (error || errorData) {
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

          {data?.strapi_administrator.map((admin, index) => {
            return (
              <ul key={index}>
                <li>{admin.id}</li>
                <li>{admin.firstname}</li>
                <li>{admin.email}</li>
                <li>{admin.isActive}</li>
                <li>{admin.lastname}</li>
                <li>{admin.password}</li>
                <li>{admin.username}</li>
                <li>{admin.resetPasswordToken}</li>
                <li>{admin.registrationToken}</li>
                <li>{admin.preferedLanguage}</li>
              </ul>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default User;
