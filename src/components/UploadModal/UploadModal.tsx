import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'query-string';
import config from 'config';
import Dropzone from 'components/Dropzone';
import Modal from 'containers/Modal';
import DropboxButton from 'components/DropboxChooser';
import GdriveButton from 'components/GdriveChooser';
import DefaultSeparator from 'components/FormSeparator';

const Separator = styled(DefaultSeparator)`
  margin: 0.5rem 0;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

class UploadModal extends Component {
  handleOnDrop = (newFiles) => {
    const { addFiles } = this.props;
    addFiles(newFiles);
  }

  handleRemoveFileClick = (id) => () => {
    const { removeFile } = this.props;
    removeFile(id);
  }

  handleCancelClick = () => {
    const { onClose, clearAllFiles } = this.props;
    clearAllFiles();
    onClose();
  }

  handleSubmitClick = () => {
    const { onSubmit, files } = this.props;
    onSubmit(files);
  }

  handleDropboxChoose = (files) => {
    const { addFiles } = this.props;
    const fileObjects = files.map((file) => {
      const thumbnailObj = qs.parseUrl(file.thumbnailLink);
      const thumbnailSearch = qs.stringify({ ...thumbnailObj.query, bounding_box: 256 });

      return {
        thumbnail: `${thumbnailObj.url}?${thumbnailSearch}`,
        file: {
          url: file.link,
          name: file.name,
        },
        source: 'dropbox',
      };
    });
    addFiles(fileObjects);
  }

  render() {
    const {
      uploadStatus, 
      name, 
      title, 
      subtitle, 
      files, 
      createNotification, 
      csvData, 
      exportErredCsvRows,
      uploadVia
    } = this.props;

    // console.log('files -> ', files);

    return ( 
      <Modal
        name={name}
        title={title}
        subtitle={subtitle}
        submitText={files.some((file) => file.status.isError) ? 'Retry' : 'Upload'}
        buttonsAreVisible={files.length > 0}
        onClose={this.handleCancelClick}
        onCancelClick={this.handleCancelClick}
        onSubmitClick={this.handleSubmitClick}
        isLoading={uploadStatus.isLoading}
        cancelIsDisabled={uploadStatus.isLoading}
        fullWidth
        fullHeight
      >
        <Dropzone
          disabled={uploadStatus.isLoading}
          onDrop={this.handleOnDrop}
          onRemoveFileClick={this.handleRemoveFileClick}
          files={files}
          createNotification={createNotification}
          csvData={csvData}
          exportErredCsvRows={exportErredCsvRows}
          isLoading={uploadStatus.isLoading}
        />
        
        <ButtonsContainer>
          <DropboxButton 
            appKey={config.dropboxAppKey} 
            onSuccess={this.handleDropboxChoose} 
            style={{ marginRight: '1rem' }}
            uploadVia={uploadVia} />
          <GdriveButton
            clientId={config.googleClientId}
            developerKey={config.googleDeveloperKey}
            onSuccess={this.handleOnDrop}
            uploadVia={uploadVia}
          />
        </ButtonsContainer>
      </Modal>
    );
  }
}

// UploadModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   uploadStatus: PropTypes.object.isRequired,
//   addFiles: PropTypes.func.isRequired,
//   removeFile: PropTypes.func.isRequired,
//   clearAllFiles: PropTypes.func.isRequired,
//   createNotification: PropTypes.func.isRequired,
//   exportErredCsvRows: PropTypes.func.isRequired,
//   csvData: PropTypes.array.isRequired,
//   files: PropTypes.array,
//   name: PropTypes.string,
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
// };

UploadModal.defaultProps = {
  name: 'upload',
  title: 'Upload Artworks',
  subtitle: `Upload the highest resolution images for your artwork and we'll
    re-size them for your use. After this, we'll help you add your artwork details!`,
};

export default UploadModal;
