import { menuItems } from 'components/Menu';
import { IMenuItem } from 'components/Menu/MenuItem';
import { useArtistData } from 'features/core/context/artistInfo.context';
import { filter, flow, map } from 'lodash/fp';
import { CommonStateNames } from 'model/machines/common.state.machines';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useArtistSocialLinks from '../../../features/user/hooks/useArtistSocialLinks';
import { Heading } from '../layout/heading';
import './artist-footer.scss';
export const ArtistPageFooter = (props: {}) => {
  const [artistState] = useArtistData();
  const artist = artistState.context.artistData;
  const loadingArtist = artistState.value === CommonStateNames.Loading;
  const socialLinks = useArtistSocialLinks(artist?.social_links || []);
  const items = artist ? menuItems(artist as any) : [];
  return (
    <div className="artist_footer">
      <Heading skeleton={loadingArtist} type="h3" className="artist_footer__name">{`${artist?.first_name || ''} ${
        artist?.last_name || ''
      }`}</Heading>
      <div className="artist_footer__pages">
        {flow(
          filter((item: IMenuItem) => !item.disabled),
          map((item) => (
            <Link className="artist_footer__link" to={item.to}>
              {item.name}
            </Link>
          )),
        )(items)}
      </div>
      <div className="artist_footer__social">
        {socialLinks?.map((link) => (
          <Link className="artist_footer__link" to={link.url}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
