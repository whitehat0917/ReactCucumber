import monitoringService from 'services/sentry';
import { CURRENCIES } from '../constants/artworks';

export const fetchImage = (url, ignoreLog = false) =>
  new Promise((resolve, reject) => {
    if (!url) {
      if (!ignoreLog) {
        monitoringService.logError(new Error('Fetch image error - no url provided'));
      }
      reject(url);
      return;
    }
    const image = new window.Image();
    image.setAttribute('crossorigin', 'anonymous');
    image.src = url;
    if (image.complete) {
      resolve(url);
    } else {
      image.addEventListener('load', () => resolve(url), false);
      image.addEventListener(
        'error',
        () => {
          if (!ignoreLog) {
            const error = new Error('Failed to fetch image');
            monitoringService.logError(error, { url });
          }
          reject(url);
        },
        false,
      );
    }
  });

export const getImageDimensions = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const image = new Image();
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
      };
      image.onerror = reject;
      image.src = fr.result;
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

export const getImageDimensionsFromBlob = (blob) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const objectURL = URL.createObjectURL(blob);
    image.onload = () => {
      resolve({ width: image.width, height: image.height });
      URL.revokeObjectURL(objectURL);
    };
    image.onerror = (err) => {
      reject(err);
      URL.revokeObjectURL(objectURL);
    };
    image.src = objectURL;
  });

export const DOLLAR = '$';
export const EURO = '€';
export const POUND = '£';

export const getCurrency = (currencyNum) => {
  switch (currencyNum) {
    case 1:
      return DOLLAR;
    case 2:
      return EURO;
    case 3:
      return POUND;
    default:
      return CURRENCIES[currencyNum]?.label;
    //return null;
  }
};

export const getcurrencyCode = (currencyNum) => CURRENCIES[currencyNum]?.idString;

// FIXME: Decide about the correct way to represent currency
export const formatPrice = (amount, currency) => `${CURRENCIES[currency].label} ${parseFloat(amount).toFixed(2)}`;
