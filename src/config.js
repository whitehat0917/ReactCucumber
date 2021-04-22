/* eslint-disable import/no-dynamic-require */
const { TARGET_ENV = 'development', API_URL } = process.env; // set default when using storybook

const envConfig = require(`./env_configs/config.${TARGET_ENV}.js`);
//sessionStorage.setItem('state', require("crypto").randomBytes(8).toString('hex'));
sessionStorage.setItem('state', 'initial');
const commonConfigs = {
  env: TARGET_ENV,
  isDev: TARGET_ENV !== 'production',
  isBrowser: typeof window !== 'undefined',
  apiUrl: API_URL,
  googleClientId: '290827478290-0nsfnnfhjs7hq280rkvndqh8kmsorlqb.apps.googleusercontent.com',
  facebookAppId: '621056494905163',
  appleClientId: 'com.marcelforart.marcel-signin-with-apple',
  redirectURI: process.env.APPLE_REDIRECT_URI,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
};

const mergedConfig = Object.assign({}, commonConfigs, envConfig);

export default mergedConfig;
