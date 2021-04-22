/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import EventListener from 'react-event-listener';
import Responsive from 'react-responsive';
import Icon from 'atoms/Icon';
import ArtworkViewHeader from 'molecules/ArtworkViewHeader';
import ArtworkViewCarousel from 'molecules/ArtworkViewCarousel';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';
import authService from 'services/auth';
import ArtworkViewMetadataMobile from 'molecules/ArtworkViewMetadataMobile';
import ArtworkImageSwiper from 'molecules/ArtworkImageSwiper';
import ContactModal from 'containers/ContactModal';
import LoadingOverlay from 'molecules/LoadingOverlay';

const Desktop = (props) => <Responsive {...props} minWidth={769} />;
const Mobile = (props) => <Responsive {...props} maxWidth={768} />;

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <ReactModal
    className={modalClassName}
    portalClassName={className}
    {...props}
  />
);

const Modal = styled(ReactModalAdapter).attrs({
  overlayClassName: {
    base: 'Overlay',
    afterOpen: 'Overlay--after-open',
    beforeClose: 'Overlay--before-close',
  },
  modalClassName: {
    base: 'Modal',
    afterOpen: 'Modal--after-open',
    beforeClose: 'Modal--before-close',
  },
})`
  .Modal {
    &--after-open {
      opacity: 1;
      transition: opacity 150ms;
      display: flex;
      flex-direction: column;
    }

    &--before-close {
      opacity: 0;
    }

    overflow: auto;
    outline: none;

    max-height: calc(100% - 3rem);
    
    margin: 1.75rem 5rem; 
    z-index: 10;
    border: none;
    box-sizing: border-box;
    opacity: 0;
    width: 100%;
    height: 100%;

    @media only screen and (max-width: 768px) {
      margin: 0.25rem 0;
      max-height: 100%;
    }
  }

  .Overlay {
    &--after-open {
      opacity: 1;
      transition: opacity 150ms;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--before-close {
      opacity: 0;
    }

    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background-color: rgba(7, 7, 10, 0.9);
    opacity: 0;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 2.75rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ImageContainerDesktop = styled(ImageContainer)`
  height: calc(100% - 7.5rem);
`;

const ArrowContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover>svg *{
    fill: ${({ theme }) => theme.palette.white};    
  }
`;

const ArrowContainerDesktop = styled(ArrowContainer)`
  top: 8rem;
  width: 10vw;
`;

const ArrowLeftContainerDesktop = styled(ArrowContainerDesktop)`
  left: 0;  
`;

const ArrowRightContainerDesktop = styled(ArrowContainerDesktop)`
  right: 0;  
`;


const Arrow = styled((props) => <Icon width="1.5rem" height="1.5rem" {...props} />)`
  fill: ${({ theme }) => theme.palette.gray[80]};
`;

class ArtworkView extends React.Component {
  state = {
    isFullScreen: true,
    activeImageHeight: 350,
  };

  handleFullScreenClick = () => {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));
  };

  handleActiveImageChange = (activeImageHeight) => {
    this.setState({ activeImageHeight: activeImageHeight < 50 ? 350 : activeImageHeight });
  }

  handleKeyDown = (e) => {
    const { onPrevClick, onNextClick } = this.props;
    switch (e.key) {
      case 'ArrowRight':
        onNextClick();
        break;
      case 'ArrowLeft':
        onPrevClick();
        break;
      default:
    }
  };

  handleSharingClick = (type) => {
    // This is called also for pressing on the arrow so we only want to log the platform
    if (typeof (type) === 'object') {
      return;
    }
    if (!authService.isImpersonated()) {
      customAnalyticsService.trackGA('Share', 'Share', type);
      userAnalyticsService.event({
        category: 'Share',
        action: type,
      });
    }
  };

  renderContactModal = () => {
    const {
      publicUserInfo: {
        first_name, last_name,
      },
    } = this.props;
    return <ContactModal person={`${first_name}\xa0${last_name}`} />;
  }

  RenderView = ({ children, isLoading }) => {
    if (isLoading) {
      return <LoadingOverlay />
    }

    return React.cloneElement(children);
  }

  render() {
    const {
      artwork, 
      onNextClick, 
      onPrevClick, 
      onCloseClick, 
      onLoad, 
      nextArtworkExists, 
      prevArtworkExists, 
      onContactButtonClick,
      isLoading,
      artworksClickToViewMetadata
    } = this.props;
    const { isFullScreen, activeImageHeight } = this.state;

    const RenderView = this.RenderView;

    return (
      <Modal
        appElement={document.createElement('div')}
        closeTimeoutMS={150}
        isOpen
        onRequestClose={onCloseClick}
      >
        {this.renderContactModal()}
        <EventListener
          target="window"
          onKeyDown={this.handleKeyDown}
        />
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
            onSharingButtonClick={this.handleSharingClick}
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
        <Mobile>
          <RenderView isLoading={isLoading}>
            <ArtworkImageSwiper
              handleFullScreenClick={this.handleFullScreenClick}
              isFullScreen={isFullScreen}
              artwork={artwork}
              onCloseClick={onCloseClick}
              onActiveImageChange={this.handleActiveImageChange}
              activeImageHeight={activeImageHeight}
            />
          </RenderView>
          <ArtworkViewMetadataMobile
            handleFullScreenClick={this.handleFullScreenClick}
            isFullScreen={isFullScreen}
            artwork={artwork}
            onContactButtonClick={onContactButtonClick}
            onArtistProfileClick={onCloseClick}
            activeImageHeight={activeImageHeight}
          />
        </Mobile>
      </Modal>
    );
  }
}

ArtworkView.propTypes = {
  publicUserInfo: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    primary_image_signed: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  artwork: PropTypes.object.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  prevArtworkExists: PropTypes.bool.isRequired,
  nextArtworkExists: PropTypes.bool.isRequired,
  onLoad: PropTypes.func,
  onContactButtonClick: PropTypes.func,
};

export default ArtworkView;
