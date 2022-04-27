import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';


import { I18nextProvider } from 'react-i18next';

import App from './app/providers/App';
import i18n from './helper/i18n';
import Store from './app/models';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...new Store().getStores()}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
