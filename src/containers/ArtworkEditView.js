import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ArtworkEditView from 'organisms/ArtworkEditView';
import {
  artworksSetSelected, artworksDeleteRequest,
  modalOpen, modalClose, artworksSingleArtworkFetchRequest,
} from 'store/actions';
import { fromArtworks } from 'store/selectors';
import LoadingOverlay from 'molecules/LoadingOverlay';
import Typography from 'atoms/Typography';

class ArtworkEditViewContainer extends React.Component {
  componentDidMount() {
    const {
      match, selectedArtworkId, setSelectedArtwork, requestArtwork, artwork, fetchSingleStatus,
    } = this.props;
    if (artwork && selectedArtworkId !== artwork.id) { // we got to this page from the portfolio and this artwork is already loaded
      setSelectedArtwork(artwork.id);
    } else if (!selectedArtworkId && !fetchSingleStatus.errorMessage) { // load this specific artwork
      requestArtwork(match.params.artworkId);
    }
  }

  render() {
    const {
      selectedArtworkId, deleteArtwork, fetchSingleStatus, openDeleteModal, closeDeleteModal, deleteStatus,
    } = this.props;
    if (fetchSingleStatus.isLoading) {
      return (<LoadingOverlay label="Loading your awesome artworks" />);
    }
    if (!selectedArtworkId) {
      return (<Typography type="h3" color="muted">Artwork not found</Typography>);
    }
    return (
      <ArtworkEditView
        onDelete={deleteArtwork}
        onDeleteModalClose={closeDeleteModal}
        onDeleteRequest={openDeleteModal}
        deleteStatus={deleteStatus}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedArtworkId: fromArtworks.getSelectedId(state),
  fetchSingleStatus: fromArtworks.getStatus(state, 'fetch_single'),
  deleteStatus: fromArtworks.getStatus(state, 'delete'),
  artwork: fromArtworks.getArtwork(state, ownProps.match.params.artworkId),
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedArtwork: (artworkId) => dispatch(artworksSetSelected(artworkId)),
  requestArtwork: (artworkId) => dispatch(artworksSingleArtworkFetchRequest(artworkId)),
  deleteArtwork: () => dispatch(artworksDeleteRequest()),
  openDeleteModal: () => dispatch(modalOpen('delete_artwork_confirm')),
  closeDeleteModal: () => dispatch(modalClose('delete_artwork_confirm')),
});


ArtworkEditViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  setSelectedArtwork: PropTypes.func.isRequired,
  requestArtwork: PropTypes.func.isRequired,
  fetchSingleStatus: PropTypes.object.isRequired,
  deleteStatus: PropTypes.object.isRequired,
  deleteArtwork: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  artwork: PropTypes.object,
  selectedArtworkId: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtworkEditViewContainer));
