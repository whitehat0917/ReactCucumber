import { ApiArtwork } from '../../model/artwork.types';
import { apiRequest } from './util';

export const artworkDataFromId = apiRequest<[string], ApiArtwork>((artworkId) => `artworks/${artworkId}/`, 'GET');
