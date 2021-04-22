import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import ArtworkCard from 'organisms/ArtworkCard';
import styled from 'styled-components';
import EventListener, { withOptions } from 'react-event-listener';
import { throttle } from 'lodash';
import { getScrollOffsetBottom } from 'utils/common';
import PortfolioHeader from 'containers/PortfolioHeader';
import ContentWrapper from 'atoms/ContentWrapper';
import ArtworksViewSwitcher from 'containers/ArtworksViewSwitcher';
import Sorting from 'containers/Sorting';
import VisibilitySensor from 'react-visibility-sensor';
import MinorLoader from 'atoms/MinorLoader';

const CardWrapper = styled.div`
  padding: ${({ isCollection }) => (isCollection ? '1rem 1rem 1rem 0' : '1rem')};
  width: 100%;

  @media (min-width: 576px) {
    width: 50%;
  }

  @media (min-width: 768px) {
    width: 33.3%;
  }

  @media (min-width: 992px) {
   width: 25%;
  }

  @media (min-width: 1200px) {
     width: ${({ isCollection }) => (isCollection ? '25%' : '20%')};
  }

  @media only screen and (max-width: 768px) { 
    width: 50%;
    padding: ${({ isCollection }) => (isCollection ? '0.344rem' : '0.125rem')};
  }

  box-sizing: border-box;
`;

const SwitcherWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const Wrapper = ({ noWrapper, children, ...rest }) => {
  if (noWrapper) {
    return (
      <Fragment>
        { children }
      </Fragment>
    );
  }
  return (
    <ContentWrapper withPaddings {...rest}>
      { children }
    </ContentWrapper>
  );
};


class ArtworksGridView extends React.Component {
  state = {
    currentImageContainerWidth: null,
  }

  handleScroll = throttle(() => {
    const offsetToBottom = getScrollOffsetBottom();
    const { requestArtworks, isFetching, artworksMeta } = this.props;
    if (!isFetching && artworksMeta.hasMore && offsetToBottom < window.innerHeight) {
      requestArtworks();
    }
  }, 500, { trailing: false });

  handleArtworkClick = (artworkId) => () => {
    const { pushPage, onArtworkClick } = this.props;
    if (onArtworkClick) {
      onArtworkClick(artworkId);
    } else if (pushPage) {
      pushPage(`/${artworkId}/edit`);
    }
  }

  handleLoadMore = (isVisible) => {
    const { requestArtworks, isFetching, artworksMeta } = this.props;
    if (!isFetching && isVisible && artworksMeta.hasMore) {
      requestArtworks();
    }
  }

  handleCardResize = ({ width }) => {
    const { currentImageContainerWidth } = this.state;
    if (currentImageContainerWidth !== width) {
      this.setState({ currentImageContainerWidth: width });
    }
  }

  render() {
    const {
      artworks, noWrapper, hideHeader, hideControls, hideArtworksMeta, artworksMeta, isCollection, artworksData
    } = this.props;
    const { currentImageContainerWidth } = this.state;

    // console.log('artworks -> ', artworks);
    // console.log('artworksData -> ', artworksData);

    return (
      <Wrapper noWrapper={noWrapper}>
        <EventListener
          target="window"
          onResize={this.handleResize}
          onScroll={withOptions(this.handleScroll, { passive: true, capture: false })}
        />
        {!hideHeader && <PortfolioHeader />}
        {!hideControls && (
          <SwitcherWrapper>
            <Sorting />
            <ArtworksViewSwitcher />
          </SwitcherWrapper>
        )}
        <Masonry options={{ transitionDuration: 0 }}>
          {
            artworks.map((artwork) => (
              <CardWrapper key={artwork.artwork || artwork.id} data-type="artworkCard" isCollection={isCollection}>
                <ArtworkCard
                  artwork={artwork}
                  images={(artworksData && artworksData[artwork.artwork]) || artwork.images}
                  onArtworkClick={this.handleArtworkClick}
                  hideMeta={hideArtworksMeta}
                  onResize={this.handleCardResize}
                  currentWidth={currentImageContainerWidth}
                  isCollection={isCollection}
                />
              </CardWrapper>
            ))
          }
        </Masonry>
        {
          artworksMeta.hasMore
          && (
            <VisibilitySensor onChange={this.handleLoadMore}>
              <div style={{ height: '30px', marginBottom: '10px' }}>
                <MinorLoader />
              </div>
            </VisibilitySensor>
          )
        }
      </Wrapper>
    );
  }
}

ArtworksGridView.propTypes = {
  artworks: PropTypes.array.isRequired,
  requestArtworks: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pushPage: PropTypes.func,
  onArtworkClick: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideControls: PropTypes.bool,
  noWrapper: PropTypes.bool,
  hideArtworksMeta: PropTypes.bool,
  artworksMeta: PropTypes.shape({
    hasMore: PropTypes.bool,
  }).isRequired,
  isCollection: PropTypes.bool,
};

export default ArtworksGridView;
