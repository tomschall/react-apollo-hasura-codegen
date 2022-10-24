import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ApolloWrapper from './ApolloWrapper';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <ApolloWrapper>
        <React.Fragment>
          <App />
        </React.Fragment>
      </ApolloWrapper>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
