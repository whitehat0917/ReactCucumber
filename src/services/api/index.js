/* eslint-disable no-shadow */
import 'whatwg-fetch';
import { stringify } from 'query-string';
import merge from 'lodash/merge';
import config from 'config';
import authService from 'services/auth';

const { apiUrl } = config;

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(`${response.status} ${response.statusText}`);
  error.response = response.original_errors || response;
  return response.clone().json().then((data) => {
    error.message = data.original_errors || data;
    return Promise.reject(error);
  }).catch(() => Promise.reject(error));
};

export const parseJSON = (response) => (response.status === 204 ? Promise.resolve() : response.json());

export const parseSettings = ({
  method = 'get', data, locale, headers: customHeaders, ...otherSettings
} = {}) => {
  const token = authService.getToken();
  const impersonatedToken = authService.getImpersonateToken();

  const authHeader = {};

  if (token !== null) {
    authHeader.Authorization = `Bearer ${impersonatedToken || token}`;
  }
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
    ...authHeader,
    ...customHeaders,
  };
  let body;
  if (data) {
    if (headers['Content-Type'] === 'application/json') {
      body = JSON.stringify(data);
    } else {
      body = data;
    }
  }
  if (headers['Content-Type'] === 'multipart/form-data') {
    delete headers['Content-Type'];
  }
  const settings = merge({
    body,
    method,
    headers,
  }, otherSettings);
  return settings;
};

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : '';
  return `${url}${querystring}`;
};

const api = {};

api.request = (endpoint, { params, ...settings } = {}) => fetch(
  parseEndpoint(endpoint, params), parseSettings(settings),
)
  .then(checkStatus)
  .then(parseJSON);

['DELETE', 'GET'].forEach((method) => {
  api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings });
});
['POST', 'PUT', 'PATCH'].forEach((method) => {
  api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint, settings) {
    return api.request(endpoint, merge({}, this.settings, settings));
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'POST', data, ...settings });
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: 'GET', ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'PUT', data, ...settings });
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'PATCH', data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'DELETE', ...settings });
  },
});

export default api;
