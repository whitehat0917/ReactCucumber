import ReactGA from 'react-ga';
import config from '../../config';

export const initialize = () => {
  ReactGA.initialize(config.gaTrackingId);
};

export const set = (fieldsObject) => {
  ReactGA.set(fieldsObject);
};

// ga calls the native tracker
export const ga = (action, arg2, arg3) => {
  ReactGA.ga(action, arg2, arg3);
};

export const event = (eventData) => {
  ReactGA.event(eventData);
};
