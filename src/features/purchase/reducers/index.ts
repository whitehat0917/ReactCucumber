import product from './product';
import contactData from './contactData';
import shippingData from './shippingData';
import billingData from './billingData';

export default {
    ...product,
    ...contactData,
    ...shippingData,
    ...billingData
};
