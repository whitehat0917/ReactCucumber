/* eslint-disable camelcase */
import ArtworksSlider from 'features/artwork/ArtworksSlider';
import React, { Fragment } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Skeleton } from 'styled';
import ArtworksGridView from '../../artwork/ArtworksPublicGallery/ArtworksGridView';
import { ArtworksHolder, Description, GridWrapper, Title, TitleAndBioWrapper } from './styled';

const RenderInfo = ({ selectedCollection }) => {
  if (selectedCollection) {
    return (
      <TitleAndBioWrapper>
        <Title>{selectedCollection.name}</Title>
        <Description>{selectedCollection.description}</Description>
      </TitleAndBioWrapper>
    );
  }

  return (
    <TitleAndBioWrapper>
      <Title>
        <Skeleton width="300px" />
      </Title>
      <Description>
        <Skeleton width="200px" />
      </Description>
    </TitleAndBioWrapper>
  );
};

const SingleCollection = ({ selectedCollection, selCollUpdateId, isLoading, onLoadMore, scrollRef }) => {
  const { path } = useRouteMatch();

  return (
    <ArtworksHolder>
      <GridWrapper>
        <Fragment>
          <RenderInfo selectedCollection={selectedCollection} />
          <ArtworksGridView
            isLoading={isLoading}
            artworks={
              selectedCollection &&
              selectedCollection.artworks.results.map((artwork) => ({
                ...artwork,
                ...artwork.artwork_data,
              }))
            }
            scrollRef={scrollRef}
            total={selectedCollection?.artworks?.count}
            updateId={selCollUpdateId}
            noWrapper
            hideArtworksMeta
            isCollection
            artworksMeta={{}}
            onLoadMore={onLoadMore}
          />
        </Fragment>
      </GridWrapper>
      {selectedCollection && (
        <Route
          path={`${path}/artwork/:artworkId`}
          render={(props) => <ArtworksSlider artworks={selectedCollection.artworks.results} {...props} />}
        />
      )}
    </ArtworksHolder>
  );
};

export default SingleCollection;
