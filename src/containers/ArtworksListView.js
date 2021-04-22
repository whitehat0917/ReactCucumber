import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromArtworks } from 'store/selectors';
import ArtworksListView from 'organisms/ArtworksListView';
import {
  modalOpen, modalClose, artworksBulkActionsRequest, deleteMultipleArtworks
} from 'store/actions';

const ArtworkListViewContainer = (props) => (
  <ArtworksListView {...props} />
);

const mapStateToProps = (state) => ({
  bulkActionStatus: fromArtworks.getStatus(state, 'bulk_actions'),
});

const mapDispatchToProps = (dispatch) => ({
  bulkAction: (ids, action) => dispatch(artworksBulkActionsRequest(ids, action)),
  openConfirmModal: () => dispatch(modalOpen('bulk_actions_confirm')),
  closeConfirmModal: () => dispatch(modalClose('bulk_actions_confirm')),
  deleteMultipleArtworks: () => dispatch(deleteMultipleArtworks())
});

ArtworkListViewContainer.propTypes = {
  checkImagesStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkListViewContainer);
