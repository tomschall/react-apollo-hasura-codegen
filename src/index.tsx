import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ApolloWrapper from './ApolloWrapper';
import { AppState } from '@auth0/auth0-react/dist/auth0-provider';

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: AppState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN || '';
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const redirectUri: string = process.env.REACT_APP_AUTH0_REDIRECT_URI || '';
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE || '';

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={redirectUri}
    onRedirectCallback={onRedirectCallback}
    audience={audience}
  >
    <BrowserRouter>
      <ApolloWrapper>
        <React.Fragment>
          <App />
        </React.Fragment>
      </ApolloWrapper>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
