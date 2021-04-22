import { TUserInfo } from '../../features/user/user-types';
import { IMenuItem } from './MenuItem';

const menuItems = (publicInfo: TUserInfo): IMenuItem[] => {
  const {
    marcel_username: userName,
    is_shop_active,
    is_shop_visible,
    is_stripe_verified,
    is_paypal_connected,
  } = publicInfo;

  const isShopEnabled = is_shop_visible && ((is_shop_active && is_stripe_verified) || is_paypal_connected);

  return [
    {
      to: `/${userName}`,
      name: 'Home',
    },
    {
      to: `/${userName}/collections`,
      name: 'Collections',
    },
    {
      to: `/${userName}/shop`,
      name: 'Shop',
      disabled: !isShopEnabled,
    },
    {
      to: `/${userName}/about`,
      name: 'About',
    },
    {
      to: `/${userName}/contact`,
      name: 'Contact',
    },
  ];
};

export default menuItems;
