import httpClient from 'services';

const getProductEndpoint = productId => `/marketplace/products/${productId}/?artwork_details=true`;
const postOrderEndpoint = productId => `/marketplace/products/${productId}/orders/`;

export const getProduct = (productId) => httpClient.get(getProductEndpoint(productId));
export const postOrder = (productId, orderData) => httpClient.post(postOrderEndpoint(productId), orderData);


