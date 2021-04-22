
export const setToken = (token) => {
  window.localStorage.setItem('auth_token', token);
};

export const setImpersonateToken = (token) => {
  window.localStorage.setItem('impersonate_token', token);
};

export const getToken = () => window.localStorage.getItem('auth_token');

export const getImpersonateToken = () => window.localStorage.getItem('impersonate_token');

export const isLoggedIn = () => Boolean(getToken());
export const isImpersonated = () => Boolean(getImpersonateToken());

export const logout = () => {
  window.localStorage.removeItem('auth_token');
};

export const logoutImpersonated = () => {
  window.localStorage.removeItem('impersonate_token');
};
