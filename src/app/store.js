import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import api from 'services/api';
import errorsMonitoringService from 'services/sentry';
import history from 'store/history';
import catchErrorsMiddleware from '../middlewares/catchErrors';
import initApp from '../middlewares/initApp';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false, immutableCheck: false }),
  catchErrorsMiddleware,
  initApp,
  errorsMonitoringService.errorReportingMiddleware,
  sagaMiddleware,
  routerMiddleware(history),
];

if (devMode) {
  middleware.push(logger);
}

export default function initStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
  });

  sagaMiddleware.run(rootSaga, { api: api.create() });

  return store;
}

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default;
//     store.replaceReducer(newRootReducer);
//   });
// }
