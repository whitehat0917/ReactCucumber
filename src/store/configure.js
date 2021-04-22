/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from 'store/history';
import errorsMonitoringService from 'services/sentry';
import config from '../config';
import middlewares from './middlewares';
import reducer from './reducer';
import sagas from './sagas';

// import { rootEpic } from '../app/rootEpic';

const devtools = config.isDev && config.isBrowser && window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__
  : () => (fn) => fn;

const configureStore = (initialState, services = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  // -----------------------------------------------
  // const epicMiddleware = createEpicMiddleware();

  const enhancers = [
    applyMiddleware(
      routerMiddleware(history),
      ...middlewares,
      sagaMiddleware,
      // epicMiddleware,
      errorsMonitoringService.errorReportingMiddleware,
    ),
    devtools(),
  ];

  const store = createStore(connectRouter(history)(reducer), initialState, compose(...enhancers));
  let sagaTask = sagaMiddleware.run(sagas, services);

  console.log('store -> ', store);
  
  // epicMiddleware.run(rootEpic);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default;
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas, services);
      });
    });
  }

  return store;
};

export default configureStore;
