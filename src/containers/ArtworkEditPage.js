import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromArtworks } from 'store/selectors';
import ArtworkEditPage from 'pages/ArtworkEditPage';

const ArtworkEditPageContainer = (props) => (
  <ArtworkEditPage {...props} />
);

const mapStateToProps = (state) => ({
  checkImagesStatus: fromArtworks.getStatus(state, 'check_images'),
});

const mapDispatchToProps = () => ({});

ArtworkEditPageContainer.propTypes = {
  checkImagesStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkEditPageContainer);
