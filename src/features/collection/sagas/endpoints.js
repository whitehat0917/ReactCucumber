import httpClient from 'services';

const COLLECTIONS_LIMIT = 8;
const ARTWORKS_LIMIT = 4;

export const getCollectionsEndpoint = ({ userId, offset, collectionsLimit }) =>
    `/artwork-collections/?artist__id=${userId}
    &all_collections=true&limit=${collectionsLimit}&offset=${offset}`;

export const getArtworksEndpoint = ({ userId, offset, collectionsLimit, artworksLimit }) =>
    `/artwork-collections/?artist__id=${userId}&all_collections=true&limit=${collectionsLimit}&offset=${offset}&sparse=true&artworks_limit=${artworksLimit}`;

export const getSelectedCollectionEndpoint = ({ userId, collectionUrl, artworksOffset, artworksLimit }) =>
    `/artwork-collections/?artist__id=${userId}&url=${collectionUrl}&artwork_details=true&all_collections=true&artworks_offset=${artworksOffset}&artworks_limit=${artworksLimit}`;

export const getCollections = ({ userId, offset, collectionsLimit }) =>
    httpClient.get(getCollectionsEndpoint({ userId, offset, collectionsLimit }));

export const getArtworks = ({ userId, offset, collectionsLimit, artworksLimit }) =>
    httpClient.get(getArtworksEndpoint({ userId, offset, collectionsLimit, artworksLimit }));

export const getSelectedCollection = ({ userId, collectionUrl, artworksOffset, artworksLimit }) =>
    httpClient.get(getSelectedCollectionEndpoint({ userId, collectionUrl, artworksOffset, artworksLimit }));
