import amplitude from 'amplitude-js';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import config from '../../config';

const amplitudeLogger = amplitude.getInstance();

// Amplitude crashes if requested to store data that has ~ tilde char
const escapeTilde = (obj) => {
  if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((accum, key) => ({
      ...accum,
      [key]: escapeTilde(obj[key]),
    }), {});
  }
  if (isArray(obj)) {
    return obj.map((val) => escapeTilde(val));
  }
  if (isString(obj)) {
    return obj.replace(/~/gm, '%7e');
  }
  return obj;
};


export const init = () => {
  amplitudeLogger.init(config.amplitudeKey);
};

export const setUserId = (userId) => {
  amplitudeLogger.setUserId(userId);
};

export const setUserProperties = (userProperties) => {
  amplitudeLogger.setUserProperties(userProperties);
};

export const logEvent = (type, data) => {
  // Only log events if user is set (We use Amplitude to log only user centric events)
  if (!amplitudeLogger.options.userId) {
    return;
  }
  amplitudeLogger.logEvent(type, escapeTilde(data));
};
