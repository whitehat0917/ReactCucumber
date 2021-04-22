import Logo from 'components/Logo';
import { CATEGORIES, CURRENCIES, METRICS, STATUSES } from 'constants/artworks';
import React from 'react';
import {
  ArtworkMeta,
  ArtworkMetaBottom,
  ArtworkMetaLogoHolder,
  ArtworkMetaOption,
  ArtworkMetaTitle,
  ArtworkStatus,
  CloseButtonHolder,
  CloseButtonMobile,
  ContactArtist,
} from './styled';

const RenderCloseButton = ({ isDesktop, showDetails, params }) => {
  if (isDesktop) {
    return (
      <CloseButtonHolder to={`/${params.userName}/collections/${params.collectionUrl}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </CloseButtonHolder>
    );
  }

  return (
    <CloseButtonMobile onClick={(e) => showDetails((state) => !state)}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </CloseButtonMobile>
  );
};

const RenderMetaData = ({ artwork, params, isDesktop, isActive, showDetails }) => {
  if (artwork) {
    const {
      artwork_data: {
        id,
        title,
        year,
        category,
        width,
        height,
        metric,
        sub_category,
        edition,
        price,
        status,
        current_location,
        artist_data,
      },
    } = artwork;
    return (
      <ArtworkMeta isDesktop={isDesktop} isActive={isActive}>
        {isDesktop && (
          <ArtworkMetaLogoHolder>
            <Logo />
          </ArtworkMetaLogoHolder>
        )}
        <RenderCloseButton isDesktop={isDesktop} showDetails={showDetails} params={params} />
        <ArtworkMetaTitle>
          {title && `${title}`}
          {year && `, ${year}`}
        </ArtworkMetaTitle>

        <ArtworkMetaOption>{category && `${CATEGORIES[category]?.label}`}</ArtworkMetaOption>
        <ArtworkMetaOption>{sub_category && `${sub_category}`}</ArtworkMetaOption>
        <ArtworkMetaOption>
          {width &&
            height &&
            metric &&
            `${Math.floor(width)} X
                        ${Math.floor(height)}
                         ${METRICS[metric].csvValue}`}
        </ArtworkMetaOption>
        <ArtworkMetaOption>{edition && `Edition: ${edition}`}</ArtworkMetaOption>
        <ArtworkMetaOption>
          {price && `${CURRENCIES[artist_data.currency]?.label || ''} ${parseFloat(price).toFixed(2)}`}
        </ArtworkMetaOption>
        <ArtworkStatus status={status}>{status && `${STATUSES[status]?.label || ''}`}</ArtworkStatus>
        <ArtworkMetaOption>{current_location && `${current_location}`}</ArtworkMetaOption>
        {isDesktop && (
          <ArtworkMetaBottom>
            <p>{`Interested in the artwork? `}</p>
            <ContactArtist to={`/${artist_data.marcel_username}/contact/${id}`}>Contact artist</ContactArtist>
          </ArtworkMetaBottom>
        )}
      </ArtworkMeta>
    );
  }

  return null;
};

export default RenderMetaData;
