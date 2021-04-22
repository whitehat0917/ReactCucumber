import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtworkImages from 'organisms/ArtworkImages';
import { artworksEditSelected } from 'store/actions';
import { fromArtworks } from 'store/selectors';

class ArtworkImagesContainer extends React.Component {
  handleImageDelete = (imageId) => () => {
    const { editArtwork, artwork: { imagesToDelete = [] } } = this.props;
    editArtwork({ imagesToDelete: [...imagesToDelete, imageId] });
  }

  render() {
    const { artwork: { images, imagesToDelete = [] }, allIds } = this.props;
    const imagesToShow = images.filter((image) => !imagesToDelete.includes(image.id));

    return (
      <ArtworkImages 
        allIds={allIds}
        images={imagesToShow} 
        onDelete={this.handleImageDelete} />
    );
  }
}

const mapStateToProps = (state) => ({
  artwork: fromArtworks.getSelected(state),
  allIds: state.artworks.allIds
});

const mapDispatchToProps = (dispatch) => ({
  editArtwork: (data) => dispatch(artworksEditSelected(data)),
});

ArtworkImagesContainer.propTypes = {
  artwork: PropTypes.object.isRequired,
  editArtwork: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkImagesContainer);
