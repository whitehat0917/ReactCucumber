import httpClient from 'services';

const PAGE_SIZE = 20;
const OFFSET = 0;

// const API_URL = 'https://staging.marcelforart.com/api'; // prod

export const getArtworksEndpoint = () => 
    `/artworks/?limit=${PAGE_SIZE}&offset=${OFFSET}&ordering=-created`;

export const getPublicGalleryEndpoint = ({ userId, offset }) => 
    `/users/${userId}/public-gallery-artworks/?limit=${PAGE_SIZE}&offset=${offset}`

export const getPublicGallery = ({userId, offset}) =>
    httpClient.get(getPublicGalleryEndpoint({ userId, offset }));