import { MasonryView } from 'components/Masonry/Masonry';
import React, { Fragment } from 'react';
import { Skeleton, skeletonList } from 'styled';
import Button from '../../../components/Button';
// import styled from 'styled-components';
// import EventListener, { withOptions } from 'react-event-listener';
// import { throttle } from 'lodash';
// import { getScrollOffsetBottom } from 'utils/common';
// import PortfolioHeader from 'containers/PortfolioHeader';
// import ContentWrapper from 'atoms/ContentWrapper';
// import ArtworksViewSwitcher from 'containers/ArtworksViewSwitcher';
// import Sorting from 'containers/Sorting';
// import VisibilitySensor from 'react-visibility-sensor';
// import MinorLoader from 'atoms/MinorLoader';
import { CardWrapper } from '../../collection/SingleCollectionPage/styled';
import { LoadMoreBox } from '../../privateGallery/styled';
import { TArtwork } from '../artwork-type';
import ArtworkCard from './ArtworkCard';
const RenderArtworks = ({ artworks, updateId, isLoading, total }) => {
  if (artworks) {
    let loadedArtworks = artworks.map((artwork, idx) => (
      <CardWrapper key={`artworkCard_${artwork.id}`} data-type="artworkCard" isNew={artwork.update_id === updateId}>
        <ArtworkCard artwork={artwork} nextArtwork={artworks[idx + 2]} images={artwork.artwork_data.images} />
      </CardWrapper>
    ));

    if (!isLoading) return loadedArtworks;

    let delta = total - loadedArtworks.length;
    delta = Math.min(delta, 20);

    // Generate skeletons as placeholders for new items
    let skeletons = Array(delta)
      .fill(null)
      .map((item, idx) => (
        <CardWrapper key={`artworkNewSkel_${idx}`} data-type="artworkCard">
          <Skeleton height="200px" />
        </CardWrapper>
      ));

    return [...loadedArtworks, ...skeletons];
  }
  return skeletonList.map((item, idx) => (
    <CardWrapper key={`artworkSkel_${idx}`} data-type="artworkCard">
      <Skeleton height="200px" />
    </CardWrapper>
  ));
};

const ArtworksGridView = ({
  artworks,
  updateId,
  hasMore,
  onLoadMore,
  isLoading,
  total,
  scrollRef,
}: {
  artworks: TArtwork[];
  updateId: string;
  hasMore: boolean;
  onLoadMore: () => any;
  isLoading: boolean;
  total: number;
  scrollRef?: React.RefObject<HTMLElement>;
}) => {
  const loadMore = React.useMemo(() => () => !isLoading && onLoadMore(), [onLoadMore, isLoading, hasMore]);
  return (
    <Fragment>
      <MasonryView
        //enableResizableChildren={true}
        //updateOnEachImageLoad={true}
        //options={{ transitionDuration: 0 }}
        isLoading={isLoading}
        elements={artworks || []}
        loadMore={loadMore}
        totalItems={total}
        scrollElemRef={scrollRef}
        columns={{ 770: 2 }}
        defaultColumns={3}
        heightEstimation={(width: number, artwork: TArtwork) => {
          if (
            !artwork.artwork_data.images ||
            !artwork.artwork_data.images[0] ||
            !artwork.artwork_data.images[0]?.image_original_height
          ) {
            return 0;
          }
          return (
            (artwork.artwork_data.images[0].image_original_height * width) /
            artwork.artwork_data.images[0].image_original_width
          );
        }}
        map={(artwork: any, width, idx) =>
          artwork ? (
            <ArtworkCard
              key={`artworkCard_${artwork.id}`}
              artwork={artwork}
              nextArtwork={artworks[idx + 2]}
              images={artwork.artwork_data.images}
              itemWidth={width}
            />
          ) : null
        }
        //totalItems={total}
      ></MasonryView>
      {hasMore && onLoadMore && (
        <LoadMoreBox>
          <Button onClick={onLoadMore}>Load more...</Button>
        </LoadMoreBox>
      )}
    </Fragment>
  );
};

export default ArtworksGridView;
