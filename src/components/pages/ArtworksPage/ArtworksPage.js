import React from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'molecules/LoadingOverlay';
import PageTemplate from 'templates/PageTemplate';
import ArtworksGridView from 'organisms/ArtworksGridView';
import ArtworksListView from 'containers/ArtworksListView';
import EmptyScreen from 'containers/EmptyScreen';
import UploadModal from 'containers/UploadModal';
import FilterDrawer from 'containers/FilterDrawer';

const ArtworksPage = ({
  mode, artworks, fetchStatus, pushPage, artworksCount, checkImagesStatus, history, requestArtworks, applyFilterStatus,
  artworksMeta, applySortingStatus, isFilterApplied,
}) => (
  <PageTemplate history={history}>
    <UploadModal />
    <FilterDrawer />
    {(fetchStatus.isLoading && fetchStatus.hasNeverLoaded)
        && <LoadingOverlay label="Loading your awesome artworks" />
    }
    {(applyFilterStatus.isLoading || applySortingStatus.isLoading || checkImagesStatus.isLoading)
      && <LoadingOverlay label="Loading your awesome artworks" />}
    {
      !fetchStatus.isLoading && !applyFilterStatus.isLoading && !applySortingStatus.isLoading
      && !checkImagesStatus.isLoading && artworksCount === 0 && <EmptyScreen isFilterApplied={isFilterApplied} />
    }
    {!checkImagesStatus.isLoading && artworksCount > 0 && mode === 'list'
      && (
        <ArtworksListView
          artworks={artworks}
          pushPage={pushPage}
          isFetching={fetchStatus.isLoading}
          requestArtworks={requestArtworks}
          artworksMeta={artworksMeta}
        />
      )
      }
    {!checkImagesStatus.isLoading && artworksCount > 0 && mode === 'grid'
      && (
        <ArtworksGridView
          artworks={artworks}
          pushPage={pushPage}
          isFetching={fetchStatus.isLoading}
          isLoading={applyFilterStatus.isLoading}
          requestArtworks={requestArtworks}
          artworksMeta={artworksMeta}
        />
      )
    }
  </PageTemplate>
);

ArtworksPage.propTypes = {
  mode: PropTypes.oneOf(['grid', 'list']),
  artworks: PropTypes.array.isRequired,
  fetchStatus: PropTypes.object,
  checkImagesStatus: PropTypes.object,
  pushPage: PropTypes.func.isRequired,
  artworksCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  requestArtworks: PropTypes.func.isRequired,
  isFilterApplied: PropTypes.bool.isRequired,
  artworksMeta: PropTypes.shape({
    hasMore: PropTypes.bool.isRequired,
  }).isRequired,
  applyFilterStatus: PropTypes.shape({
    isLoading: PropTypes.bool,
  }),
  applySortingStatus: PropTypes.shape({
    isLoading: PropTypes.bool,
  }),
};

export default ArtworksPage;
