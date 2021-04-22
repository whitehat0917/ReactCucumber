import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';
// import Avatar from 'atoms/Avatar';
// import Button from 'components/atoms/Button';
import { CATEGORIES, STATUSES, METRICS } from 'constants/artworks';
import { getCurrency } from 'utils/artworks';

import {
  Wrapper,
  MainWrapper,
  TitleWrapper,
  MetaDataWrapper,
  StyledTypography,
  Status,
  MetaDataRight,
  MetaDataLeft,
  CloseIconWrapper,
  ICON_COLOR
} from './styled';

const ArtworkViewMetadataMobile = (props) => {
  const {
    artwork,
    // onContactButtonClick,
    isFullScreen,
    // onArtistProfileClick,
    activeImageHeight,
    handleFullScreenClick
  } = props;

  const {
    title, current_location: currentLocation, category, year, sub_category: subCategory,
    price, status, height, width, depth, metric, artist_data, edition
  } = artwork;

  return (
    <Wrapper isFullScreen={isFullScreen} activeImageHeight={activeImageHeight}>
      <MainWrapper>
        <CloseIconWrapper onClick={handleFullScreenClick}>
          <Icon
            clickable
            color={ICON_COLOR}
            size={0.86}
          >
            close
          </Icon>
        </CloseIconWrapper>
        <TitleWrapper>
          <Typography weight="600" type="h3" lineHeight="1.875rem" style={{ fontSize: '1.5rem' }}>
            { title ? `${title}` : null }
          </Typography>
          <Typography weight="600" type="h3" lineHeight="1.875rem" style={{ fontSize: '1.5rem' }}>
            { year ? `${year}` : null}
          </Typography>
        </TitleWrapper>
        <MetaDataWrapper>
          <MetaDataRight>
            <StyledTypography type="small">
              { category && CATEGORIES[category].label }
            </StyledTypography>
            <StyledTypography type="small">
              {subCategory}
            </StyledTypography>
            <StyledTypography type="small">
              {
                width && height && depth // All three dimensional values have to be present
                  ? `${Number(width).toFixed(1)} x ${Number(height).toFixed(1)} x ${Number(depth).toFixed(1)} ${METRICS[metric].csvValue}`
                  : null
              }
            </StyledTypography>
            <StyledTypography type="small">
              {edition}
            </StyledTypography>
          </MetaDataRight>
          <MetaDataLeft>
            <Status type="small" color={status === 2 ? 'error' : 'success'}>
              {
                status
                  ? STATUSES[status].label
                  : null
              }
            </Status>
            <StyledTypography type="small">
              {
                price
                  ? `${getCurrency(artist_data.currency)}${Number(price).toFixed(2)}`
                  : null
              }
            </StyledTypography>
            <StyledTypography type="small">
              {currentLocation}
            </StyledTypography>
          </MetaDataLeft>
        </MetaDataWrapper>
      </MainWrapper>
      {/* <ArtistProfileWrapper onClick={onArtistProfileClick}>
        <Avatar type="square" src={avatarImg} size={2.75} iconSize="small" />
        <ArtistNameWrapper>
          <Typography weight="600" fontSize="1.125rem" lineHeight="1.25rem">
            {artist}
          </Typography>
          <Typography style={{ marginTop: '0.125rem' }} type="small" color="#FF5B00">
            Explore Portfolio
          </Typography>
        </ArtistNameWrapper>
        <IconWrapper>
          <Icon
            clickable
            style={{
              marginLeft: '0.4rem',
              marginRight: '0.3rem',
            }}
            size={0.86}
          >
            artwork_nav_arrow_right
          </Icon>
        </IconWrapper>
      </ArtistProfileWrapper> */}
      {/* <ContactButtonWrapper>
        <Button
          fullWidth
          fontWeight={600}
          onClick={onContactButtonClick}
        >
          Contact Artist
        </Button>
      </ContactButtonWrapper> */}
    </Wrapper>
  );
};

ArtworkViewMetadataMobile.propTypes = {
  artwork: PropTypes.object,
  onContactButtonClick: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  onArtistProfileClick: PropTypes.func.isRequired,
  activeImageHeight: PropTypes.number.isRequired,
};

export default ArtworkViewMetadataMobile;
