import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import ArtworkViewCarousel from 'molecules/ArtworkViewCarousel';
import ArtworkViewHeader from 'molecules/ArtworkViewHeader';

import {
  StyledIcon,
  ImageContainerDesktop,
  Arrow,
  ArrowLeftContainerDesktop,
  ArrowRightContainerDesktop,
} from './styled';

const Desktop = (props) => <Responsive {...props} minWidth={769} />;

const ArtworkViewDesktop = ({
  artwork,
  onCloseClick,
  handleSharingClick,
  isLoading,
  onLoad,
  onPrevClick,
  onNextClick,
  prevArtworkExists,
  nextArtworkExists,
  RenderView,
}) => (
  <Fragment>
    <Desktop>
      <StyledIcon
        size={0.75}
        onClick={onCloseClick}
        clickable
        color="white"
      >
                    close
      </StyledIcon>
      <ArtworkViewHeader
        artwork={artwork}
        onSharingButtonClick={handleSharingClick}
        onClick={onCloseClick}
      />
    </Desktop>
    <Desktop>
      <ImageContainerDesktop onClick={onCloseClick}>
        <RenderView isLoading={isLoading}>
          <ArtworkViewCarousel
            images={artwork.images}
            artworkId={artwork.id}
            key={artwork.id}
            type="desktop"
            onLoad={onLoad}
          />
        </RenderView>
      </ImageContainerDesktop>
      {prevArtworkExists && (
      <ArrowLeftContainerDesktop onClick={onPrevClick}>
        <Arrow>artwork_nav_arrow_left</Arrow>
      </ArrowLeftContainerDesktop>
      )}
      {nextArtworkExists && (
      <ArrowRightContainerDesktop onClick={onNextClick}>
        <Arrow>artwork_nav_arrow_right</Arrow>
      </ArrowRightContainerDesktop>
      )}
    </Desktop>
  </Fragment>
);

ArtworkViewDesktop.propTypes = {
  artwork: PropTypes.object,
  onCloseClick: PropTypes.func,
  handleSharingClick: PropTypes.func,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  prevArtworkExists: PropTypes.bool.isRequired,
  nextArtworkExists: PropTypes.bool.isRequired,
  onLoad: PropTypes.func,
  isLoading: PropTypes.bool,
  RenderView: PropTypes.func,
};

export default ArtworkViewDesktop;
