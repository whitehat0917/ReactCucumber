import camelCase from 'lodash/camelCase';
import { combineReducers } from 'redux';
import { reducer as thunk } from 'redux-saga-thunk';

const reducers = {
  thunk,
};

const req = require.context('.', true, /\.\/.+\/reducer\.js$/);

req.keys().forEach((key) => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'));
  reducers[storeName] = req(key).default;
});

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
