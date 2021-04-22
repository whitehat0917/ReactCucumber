import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import Masonry from 'react-masonry-component';
import ArtworkImage from './ArtworkImage';
import Typography from 'components/Typography';

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

interface IArtworkImages {
    images: any[],
    onDelete: (imageId) => void,
}

const ArtworkImages: React.FC<IArtworkImages> = ({ images, onDelete }) => {
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
                    onDelete={images.length > 1 ? onDelete : null}
                  />
                ))
              }
            </Masonry>
          )}
        </ReactResizeDetector>
      );
};

export default ArtworkImages;
