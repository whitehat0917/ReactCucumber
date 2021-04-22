import React from 'react';
import Icon from 'components/Icon';

import {
    ImageContainer,
    Image,
    CloseIconWrapper,
} from './styled';
import { TImage } from 'features/artwork/artwork-type';

const getImageSrc = (image) => {
  if (!image) {
    return null;
  }

  if (image.thumbnails && image.thumbnails.small) {
    return image.thumbnails.small;
  }

  if (image.thumbnails && image.thumbnails.mid) {
    return image.thumbnails.mid;
  }

  if (image.image_original) {
    return image.image_original;
  }

  return null;
};

const RenderIcon = ({ onDelete, image }) => {
  if (onDelete) {
    return (
      <CloseIconWrapper onClick={() => onDelete(image.id)}>
        <Icon size={0.5} color="primary" clickable>close</Icon>
      </CloseIconWrapper>
    );
  }

  return null;
}

interface IArtworkImage {
    image: TImage,
    width: number | string,
    onDelete: (imageId: string) => void,
}

const ArtworkImage: React.FC<IArtworkImage> = ({ width, image, onDelete }) => {
  return (
    <ImageContainer width={width}>
      <Image src={getImageSrc(image)} />
      <RenderIcon image={image} onDelete={onDelete} />
    </ImageContainer>
  );
}

export default ArtworkImage;
