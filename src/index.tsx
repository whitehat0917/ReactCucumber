// import configureStore from 'store/configure';
import App from 'app/App';
import initStore from 'app/store';
import { APP_OPENED } from 'constants/analytics';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import FontFaceObserver from 'fontfaceobserver';
// import history from 'store/history';
// import { ConnectedRouter } from 'connected-react-router';
// import api from 'services/api';
// import analyticsService from 'services/analytics';
// import errorsMonitoringService from 'services/sentry';
import customAnalytics from 'services/custom_analytics';

// import Layout from 'layouts';

// analyticsService.init();
// We are logging APP_OPENED event in 2 places since here if the user is not logged it might not be recorded
// analyticsService.logEvent(APP_OPENED);
customAnalytics.trackAmplitude(APP_OPENED);

// eslint-disable-next-line import/no-named-as-default-member
// errorsMonitoringService.init();

// const store = configureStore({}, { api: api.create() });
const store = initStore();

export type AppDispatch = typeof store.dispatch;

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const root = document.getElementById('app');
ReactDOM.render(renderApp(), root);

// if (module.hot) {
//   module.hot.accept('./app/App', () => {
//     require('./app/App');
//     render(renderApp(), root);
//   });
// }
