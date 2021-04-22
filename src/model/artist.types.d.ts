import { Artwork } from '../features/artwork/artwork-type';
export interface TArtist {
  bio: string;
  currency: number;
  featured_artwork: Artwork;
  featured_links: TFeaturedLink[];
  first_name: string;
  id: string;
  intro: string;
  seller_stripe_account_uid: string;
  is_shop_active: boolean;
  is_shop_visible: boolean;
  is_stripe_verified: boolean;
  last_name: string;
  marcel_email: string;
  marcel_username: string;
  pages: TArtistPage[];
  pixel_tracking_id: string;
  primary_image_signed: string;
  social_links: TSocialLink[];
  thumbnails: TThumbnail;
  type: number;
  url: string;
  vat_rate: string;
}

export interface TFeaturedLink {
  id: number;
  link: string;
  order: number;
  title: string;
}
export interface TThumbnail {
  mid?: string;
  mini?: string;
  small?: string;
  tiny?: string;
}
export interface TArtistPage {}
export interface TSocialLink {
  id: number;
  provider: number;
  handle: string;
}

export interface ApiContactRequest {
  from_name: string;
  from_email: string;
  body_text: string;
  artwork_id?: string;
}
