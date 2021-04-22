import React from 'react';
import { connect } from 'react-redux';
import {
  modalClose,
  artworksImagesUploadRequest,
  uploadVia
} from 'store/actions';
import { fromArtworks } from 'store/selectors';
import UploadModal from 'containers/UploadModal';

const UploadArtworkImagesModalContainer = (props) => (
  <UploadModal
    title="Upload Images"
    name="upload_images"
    {...props}
  />
);

const mapStateToProps = (state) => ({
  uploadStatus: fromArtworks.getStatus(state, 'upload_images'),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(modalClose('upload_images')), 
  onSubmit: (files) => dispatch(artworksImagesUploadRequest(files)),
  uploadVia: (source) => dispatch(uploadVia(source))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadArtworkImagesModalContainer);
