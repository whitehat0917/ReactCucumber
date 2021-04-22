import { TUserInfo } from '../user/user-types';

export type TImage = {
  id: string;
  image_original_height?: number;
  image_original_width?: number;
  thumbnails: {
    mid: string;
    mini: string;
    tiny: string;
    small: string;
  };
  order: number;
  created: string;
  updated: string;
  state: number;
  file_extension: string;
  file_size: number;
};

export type TArtwork = {
  artwork: string;
  order: number;
  artwork_data: {
    images: TImage[];
  };
};

export type Artwork = {
  id: string;
  created: string;
  updated: string;
  published: string;
  title: string;
  category: null;
  sub_category: string;
  year: null;
  year_end: null;
  status: null;
  metric: number;
  price: null;
  series: string;
  edition: string;
  number_of_edition: null;
  quantity_of_edition: null;
  current_location: string;
  width: null;
  height: null;
  depth: null;
  artist: string;
  artist_data: TUserInfo;
  images: TImage[];
  notes: any[];
  view_count: number;
  likes_count: number;
};
