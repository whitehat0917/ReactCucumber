import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'atoms/Icon';

const Container = styled.div`
  position: relative;
  display: inline-block;
  padding: 0 0.75rem 0.75rem 0;
  margin: 1rem;
  width: ${({ width }) => width}px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  display: flex;
`;

const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: 0px 1px 4px rgba(22, 22, 42, 0.15);
  border-radius: 0.25rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
`;

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

const RenderIcon = ({ onDelete }) => {
  if (onDelete) {
    return (
      <CloseIconWrapper onClick={onDelete}>
        <Icon size={0.5} color="primary" clickable>close</Icon>
      </CloseIconWrapper>
    );
  }

  return null;
}

const ArtworkImage = ({ image, width, onDelete }) => (
  <Container width={width}>
    <Image crossOrigin="" src={getImageSrc(image)} />
    <RenderIcon onDelete={onDelete} />
  </Container>
);

ArtworkImage.propTypes = {
  image: PropTypes.object,
  width: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

export default ArtworkImage;
