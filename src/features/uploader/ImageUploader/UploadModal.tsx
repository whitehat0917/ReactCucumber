import Dropzone from 'components/Dropzone';
import { useLocalizable } from 'features/core/i18n/Localizable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handleDrop, handleRemove } from '../handlers';
import uploaderSelector from '../selectors';
import { fileUploadRequest, onDrop, onRemove, resetState, uploadRequest, uploadVia } from '../uploaderSlice';
import { StyledUploadModal } from './styled';

const UploadModal = ({ isOpen, name, title, artworkTitle, subtitle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { files, status, artwork } = useSelector(uploaderSelector);
  const { _ } = useLocalizable();
  useEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  const actions = bindActionCreators(
    {
      onDrop,
      onRemove,
      uploadRequest,
      uploadVia,
      fileUploadRequest,
    },
    dispatch,
  );

  return (
    <StyledUploadModal
      isOpen={isOpen}
      name={name}
      title={artwork ? artworkTitle : title}
      subtitle={subtitle}
      submitText={_('upload')}
      buttonsAreVisible={files.length > 0}
      onClose={() => history.goBack()}
      onCancelClick={() => history.goBack()}
      onSubmitClick={actions.uploadRequest}
      isLoading={status && status.isLoading}
      fullWidth
      fullHeight
    >
      <Dropzone
        disabled={status.isLoading}
        onDrop={handleDrop(actions.onDrop, actions.fileUploadRequest)}
        onRemoveFileClick={handleRemove(actions.onRemove)}
        files={files}
        status={status}
        isLoading={status && status.isLoading}
      />
    </StyledUploadModal>
  );
};

export default UploadModal;
