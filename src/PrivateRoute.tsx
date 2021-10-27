import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface PrivateRouteProps {
  component: FunctionComponent;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...args }) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <>...loading</>,
      })}
      {...args}
    />
  );
};

export default PrivateRoute;
