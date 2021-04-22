import { FetchStaus } from '../../app/global-types';

export type TPage = {
  id: number;
  page_type: number;
  title: string;
  content: string;
};

export type TFeaturedLink = {
  id: number;
  title: string;
  link: string;
  order: number;
};

export type TSocialLink = {
  id: number;
  provider: number;
  handle: string;
};

export type TUserInfo = {
  id: string;
  currency: number;
  first_name?: string;
  last_name?: string;
  marcel_username: string;
  marcel_email: string;
  url: string;
  primary_image_signed: string;
  thumbnails: {
    tiny?: string;
    mid?: string;
    mini?: string;
  };
  type: number;
  bio: string;
  intro: string;
  pages: TPage[];
  featured_links: TFeaturedLink[];
  social_links: TSocialLink[];
  is_shop_active: boolean;
  is_shop_visible: boolean;
  is_paypal_connected: boolean;
  is_stripe_verified: boolean;
  seller_stripe_account_uid: string;
};

export type TUserStatus = {
  user_info: FetchStaus;
  user_public_info: FetchStaus;
  user_contact: FetchStaus;
};

export type TUserState = {
  status: TUserStatus;
  info: TUserInfo | {};
  publicInfo: TUserInfo | {};
  impersonated?: object;
};
