import { IMenuItem } from 'components/Menu/MenuItem';
import { useArtistData } from 'features/core/context/artistInfo.context';
import { filter, flow, map } from 'lodash/fp';
import * as React from 'react';
import { Link } from 'react-router-dom';
import menuItems from '../../../components/Menu/menuItems';
import './page-header.scss';

export const PageArtistHeader = (props: {}) => {
  const [artistState] = useArtistData();
  const items = artistState.context.artistData ? menuItems(artistState.context.artistData as any) || [] : [];

  return (
    <div className="page_header">
      <Link to={`${artistState.context.userName}`} className="page_header__artist_name">
        {artistState.context?.artistData?.first_name || ''} {artistState.context?.artistData?.last_name || ''}
      </Link>
      <div className="page_header__inline_menu">
        {flow(
          filter<IMenuItem>((item) => !item.disabled && item.name !== 'Home'),
          map<IMenuItem, React.ReactElement>((i) => (
            <Link to={i.to} className="page_header__inline_menu__item">
              {i.name}
            </Link>
          )),
        )(items)}
      </div>
    </div>
  );
};
