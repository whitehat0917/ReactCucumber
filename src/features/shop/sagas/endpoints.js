import httpClient from 'services';

const getProductsEndpoint = (userId, offset, limit) => `/marketplace/products/?target__artist=${userId}&artwork_details=true&offset=${offset}&limit=${limit}`;

export const getProducts = (userId, offset, limit) => httpClient.get(getProductsEndpoint(userId, offset, limit));
