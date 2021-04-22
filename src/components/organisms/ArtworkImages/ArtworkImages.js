import React from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import Masonry from 'react-masonry-component';
import ArtworkImage from 'molecules/ArtworkImage';
import Typography from 'atoms/Typography';
import isEqual from 'lodash/isEqual';

const computeImageWidth = (containerWidth) => {
  if (!containerWidth) {
    return 0;
  }
  const margins = 32;
  const twoColumnsLayoutWidth = Math.floor(containerWidth / 2) - margins;
  if (twoColumnsLayoutWidth > 250) {
    return twoColumnsLayoutWidth;
  }
  return containerWidth - margins;
};

class ArtworkImages extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { images } = this.props;
    return !isEqual(images, nextProps.images);
  }

  render() {
    const { images, allIds, onDelete } = this.props;
    if (images.length === 0) {
      return (
        <Typography type="h3" color="muted">This artwork has no images yet.</Typography>
      );
    }

    return (
      <ReactResizeDetector handleWidth>
        {(width) => (
          <Masonry>
            {
              images.map((image) => (
                <ArtworkImage
                  image={image}
                  key={image.id}
                  width={computeImageWidth(width)}
                  onDelete={images.length > 1 ? onDelete(image.id) : null}
                />
              ))
            }
          </Masonry>
        )}
      </ReactResizeDetector>
    );
  }
}

ArtworkImages.propTypes = {
  images: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

export default ArtworkImages;
