import * as Sentry from '@sentry/browser';
import config from '../../config';

const { TARGET_ENV } = process.env;

const init = () => {
  if (!config.sentryDSN) return;
  Sentry.init({
    dsn: config.sentryDSN,
    environment: TARGET_ENV,
  });
};

const setUser = (user) => {
  if (!config.sentryDSN) return;
  Sentry.configureScope((scope) => {
    scope.setUser({
      email: user.marcel_email,
      id: user.id,
      username: [user.first_name, user.last_name, user.marcel_username].filter((val) => val).join('-'),
    });
  });
};

const errorReportingMiddleware = () => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    if (config.sentryDSN) {
      Sentry.withScope((scope) => {
        scope.setExtra('action', action);
        Sentry.captureException(err);
      });
    }
  }
};

const logError = (error, customData) => {
  if (!config.sentryDSN) return;
  const sendError = (err, data = {}) => {
    Sentry.withScope((scope) => {
      scope.setExtras(data);
      Sentry.captureException(err);
    });
  };

  if (error.response) {
    const data = {
      status: error.response.status,
      url: error.response.url,
      message: error.message || error.toString(),
    };
    error.response.clone().text()
      .then((text) => sendError(error, { ...data, text }))
      .catch(() => sendError(error, data));
  } else {
    sendError(error, customData);
  }
};

export default {
  init,
  errorReportingMiddleware,
  logError,
  setUser,
};
