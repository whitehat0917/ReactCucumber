import { PagedResponse } from 'services/api/artist.endpoints.service';

export interface ApiArtworkImage {
  id: string;
  image_original_height: number;
  image_original_width: number;
  thumbnails: {
    mini: string;
    tiny: string;
    small: string;
    mid: string;
  };
  order: number;
  created: string;
  updated: string;
  state: number;
  file_extension: string;
  file_size: number;
}
export interface ApiArtwork {
  id: string;
  title: string;
  images: ApiArtworkImage[];
}

export interface ApiSimpleArtwork {
  id: string;
  order: number;
}

export interface ApiSparseArtwork {
  artwork: string;
  artwork_data: {
    images: ApiArtworkImage[];
  };
}

export interface ApiSimpleCollection {
  artist: string;
  artworks: ApiSimpleArtwork[];
  description: string;
  id: number;
  name: string;
  url: string;
}

export interface ApiSparseCollection {
  artworks: PagedResponse<ApiSparseArtwork>;
}
