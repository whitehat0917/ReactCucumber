import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageTemplate from 'templates/PageTemplate';
import ArtworkEditView from 'containers/ArtworkEditView';
import UploadArtworkImagesModal from 'containers/UploadArtworkImagesModal';
import LoadingOverlay from 'molecules/LoadingOverlay';

class ArtworkEditPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { history, checkImagesStatus } = this.props;
    return (
      <PageTemplate history={history}>
        <UploadArtworkImagesModal />
        {checkImagesStatus.isLoading && <LoadingOverlay label="Loading your artwork" />}
        {!checkImagesStatus.isLoading && <ArtworkEditView />}
      </PageTemplate>
    );
  }
}

ArtworkEditPage.propTypes = {
  history: PropTypes.object.isRequired,
  checkImagesStatus: PropTypes.object.isRequired,
};

export default ArtworkEditPage;
