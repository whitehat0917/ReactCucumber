import React from 'react';
import { connect } from 'react-redux';
import {
  modalClose,
  artworksUploadRequest,
  filesAdd,
  filesRemove,
  filesClearAll,
  notificationCreate,
  artworksExportCsvErred,
  uploadVia
} from 'store/actions';
import { fromFiles, fromArtworks } from 'store/selectors';
import UploadModal from 'components/UploadModal';

const UploadModalContainer = (props) => <UploadModal {...props} />;

const mapStateToProps = (state, ownProps) => ({
  uploadStatus: ownProps.uploadStatus || fromArtworks.getStatus(state, 'upload'),
  files: state.core.files,
  csvData: fromArtworks.getCsv(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClose: ownProps.onClose || (() => dispatch(modalClose('upload'))),
  onSubmit: ownProps.onSubmit || ((files) => dispatch(artworksUploadRequest(files))),
  addFiles: (files) => dispatch(filesAdd(files)),
  removeFile: (id) => dispatch(filesRemove(id)),
  clearAllFiles: () => dispatch(filesClearAll()),
  createNotification: (settings) => dispatch(notificationCreate(settings)),
  exportErredCsvRows: () => dispatch(artworksExportCsvErred()),
  uploadVia: (source) => dispatch(uploadVia(source))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(UploadModalContainer);
