import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import ArtworksPage from 'pages/ArtworksPage';
import { connect } from 'react-redux';
import { artworksFetchRequest } from 'store/actions';
import { fromArtworks, fromModal } from 'store/selectors';
import { sortByPrice, sortByUpdated, sortBySize } from 'utils/sorting';

class ArtworksPageContainer extends React.Component {
  componentDidMount() {
    const { fetchStatus, requestArtworks } = this.props;
    if (fetchStatus.hasNeverLoaded && !fetchStatus.isLoading) {
      requestArtworks();
    }
  }

  render() {
    const {
      artworks, fetchStatus, applyFilterStatus, mode, isUploadModalOpened, uploadStatus, pushPage, requestArtworks,
      checkImagesStatus, history, artworksMeta, applySortingStatus, isFilterApplied,
    } = this.props;

    return (
      <ArtworksPage
        fetchStatus={fetchStatus}
        applyFilterStatus={applyFilterStatus}
        applySortingStatus={applySortingStatus}
        mode={mode}
        isUploadModalOpened={isUploadModalOpened}
        uploadStatus={uploadStatus}
        artworks={artworks}
        pushPage={pushPage}
        requestArtworks={requestArtworks}
        artworksCount={artworks.length}
        checkImagesStatus={checkImagesStatus}
        history={history}
        artworksMeta={artworksMeta}
        isFilterApplied={isFilterApplied}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  fetchStatus: fromArtworks.getStatus(state, 'fetch'),
  artworks: fromArtworks.getArtworks(state),
  mode: fromArtworks.getMode(state),
  isUploadModalOpened: fromModal.isOpen(state, 'upload'),
  uploadStatus: fromArtworks.getStatus(state, 'upload'),
  filters: fromArtworks.getFilter(state),
  sorting: fromArtworks.getSorting(state),
  checkImagesStatus: fromArtworks.getStatus(state, 'check_images'),
  artworksMeta: fromArtworks.getMeta(state),
  applyFilterStatus: fromArtworks.getStatus(state, 'apply_filter'),
  applySortingStatus: fromArtworks.getStatus(state, 'change_sorting'),
  isFilterApplied: fromArtworks.getIsFilterApplied(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestArtworks: () => dispatch(artworksFetchRequest()),
  pushPage: (url) => dispatch(push(url)),
});

ArtworksPageContainer.propTypes = {
  requestArtworks: PropTypes.func.isRequired,
  fetchStatus: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['grid', 'list']),
  artworks: PropTypes.array.isRequired,
  isUploadModalOpened: PropTypes.bool,
  uploadStatus: PropTypes.object,
  applySortingStatus: PropTypes.object,
  applyFilterStatus: PropTypes.object,
  pushPage: PropTypes.func.isRequired,
  checkImagesStatus: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isFilterApplied: PropTypes.bool.isRequired,
  artworksMeta: PropTypes.shape({
    hasMore: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworksPageContainer);
