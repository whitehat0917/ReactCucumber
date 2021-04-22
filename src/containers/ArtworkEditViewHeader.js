import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditViewHeader from 'molecules/ArtworkEditViewHeader';
import { artworksCommitRequest, modalOpen } from 'store/actions';
import { fromArtworks } from 'store/selectors';

const ArtworkEditViewHeaderContainer = ({ saveArtwork, openImagesUploadModal, commitStatus }) => (
  <EditViewHeader
    onSave={saveArtwork}
    onImagesUpload={openImagesUploadModal}
    commitStatus={commitStatus}
  />
);

const mapStateToProps = (state) => ({
  commitStatus: fromArtworks.getStatus(state, 'commit'),
});

const mapDispatchToProps = (dispatch) => ({
  saveArtwork: () => dispatch(artworksCommitRequest()),
  openImagesUploadModal: () => dispatch(modalOpen('upload_images'))
});

ArtworkEditViewHeaderContainer.propTypes = {
  saveArtwork: PropTypes.func.isRequired,
  openImagesUploadModal: PropTypes.func.isRequired,
  commitStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkEditViewHeaderContainer);
