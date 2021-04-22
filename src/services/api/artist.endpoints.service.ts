import { ApiContactRequest, TArtist } from '../../model/artist.types';
import { ApiSimpleCollection } from '../../model/artwork.types';
import { apiRequest } from './util';
export const contactArtistRequest = apiRequest(
  (userName: string, contactData: ApiContactRequest) => `/users/contact/${userName}/`,
  'POST',
  (userName, contactData) => ({ ...contactData }),
);

export const artistInfoFromUserNameRequest = apiRequest<[string], TArtist>(
  (userName: string) => `users/usernames/${userName}/`,
  'GET',
);
export interface PagedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export type CollectionsResponse = PagedResponse<ApiSimpleCollection>;

export type SparseCollectionsResponse = PagedResponse<ApiSimpleCollection>;

export const sparseCollectionsRequest = apiRequest<[string, PagingCollectionsRequest | undefined], CollectionsResponse>(
  (artistId, pagingRequest = { offset: 0, limit: 20, artworkLimit: 5 }) => {
    const { offset, artworkLimit, limit } = pagingRequest;
    return `artwork-collections/?artist__id=${artistId}&all_collections=true&${limit ? `limit=${limit}` : ''}&offset=${
      offset || 0
    }&${artworkLimit ? `artworks_limit=${artworkLimit}&sparse=true` : ''}`;
  },
  'GET',
);
export const collectionsRequestWithDetails = apiRequest<
  [string, PagingCollectionsRequest | undefined],
  CollectionsResponse
>((artistId, pagingRequest = { offset: 0, limit: 20, artworkLimit: 5 }) => {
  const { offset, artworkLimit, limit } = pagingRequest;
  return `artwork-collections/?artist__id=${artistId}&all_collections=true&${limit ? `limit=${limit}` : ''}&offset=${
    offset || 0
  }&${artworkLimit ? `artworks_limit=${artworkLimit}}&artwork_details=true` : ''}`;
}, 'GET');

//export function artistCollectionsRequest(artistId:string,sparse:boolean,details:boolean,p?:PagingCollectionsRequest):Promise<CollectionsResponse>;
export const artistCollectionsRequest = apiRequest<[string, PagingCollectionsRequest | undefined], CollectionsResponse>(
  (artistId, pagingRequest = { offset: 0, limit: 20, artworkLimit: 5 }) => {
    const { offset, artworkLimit, limit } = pagingRequest;
    return `artwork-collections/?artist__id=${artistId}&artwork_details=false&all_collections=true&${
      limit ? `limit=${limit}` : ''
    }&offset=${offset || 0}&${artworkLimit ? `artworks_limit=${artworkLimit}` : ''}`;
  },
  'GET',
);

export interface PagingRequest {
  offset: number;
  limit: number;
}

export interface PagingCollectionsRequest extends PagingRequest {
  artworkLimit: number;
}
