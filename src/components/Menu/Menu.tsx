import Logo from 'components/Logo';
import RenderSocialLinks, { TLink } from 'features/user/ArtistHome/RenderSocialLinks';
import useArtistSocialLinks from 'features/user/hooks/useArtistSocialLinks';
import { TUserInfo } from 'features/user/user-types';
import _ from 'lodash';
import React, { Fragment } from 'react';
import { v4 } from 'uuid';
import MenuItem, { IMenuItem } from './MenuItem';
import { LinkHolder, MenuSocialLink, MenuText, MenuWrapper } from './styled';
interface IMenu {
  items: IMenuItem[];
  isOpen: boolean;
  publicInfo: TUserInfo;
  socialLinks?: TLink[];
  isDesktop: boolean;
}

const RenderLinks = ({ publicInfo, isDesktop, socialLinks }) => {
  if (!_.isEmpty(publicInfo) && !isDesktop) {
    return (
      <LinkHolder>
        <RenderSocialLinks linkComponent={MenuSocialLink} socialLinks={socialLinks} />
      </LinkHolder>
    );
  }

  return null;
};

const RenderLogo = ({ isDesktop }) => {
  if (!isDesktop) {
    return (
      <Fragment>
        <Logo iconOnly />
        <MenuText>
          Made with <span>Marcel</span>
        </MenuText>
      </Fragment>
    );
  }

  return null;
};

const RenderItems = ({ items, isDesktop }: { items: IMenuItem[]; isDesktop: boolean }) => {
  const enabledItems = items.filter((item) => item.disabled === undefined || !item.disabled);

  if (!isDesktop) {
    return (
      <Fragment>
        {enabledItems.map((item) => (
          <MenuItem key={v4()} to={item.to} name={item.name} isDesktop={isDesktop} />
        ))}
      </Fragment>
    );
  }

  const [, ...desktopItems] = enabledItems;

  return (
    <Fragment>
      {desktopItems.map((item) => (
        <MenuItem key={v4()} to={item.to} name={item.name} isDesktop={isDesktop} />
      ))}
    </Fragment>
  );
};

const RenderMenu = ({ items, isOpen, publicInfo, isDesktop }) => {
  const socialLinks = useArtistSocialLinks(publicInfo.social_links);

  return (
    <MenuWrapper isOpen={isOpen} isDesktop={isDesktop}>
      <RenderItems items={items} publicInfo={publicInfo} isDesktop={isDesktop} />
      <RenderLinks publicInfo={publicInfo} socialLinks={socialLinks} isDesktop={isDesktop} />
      <RenderLogo isDesktop={isDesktop} />
    </MenuWrapper>
  );
};

const Menu: React.FC<IMenu> = (props) => <RenderMenu {...props} />;

export default Menu;
