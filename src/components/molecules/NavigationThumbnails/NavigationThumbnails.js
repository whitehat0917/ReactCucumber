import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ThumbnailsWrapper = styled.div`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  justify-content: flex-start;
`;

const ImageWrapper = styled.div`
  height: 2.75rem;
  width: 2.75rem;
  position: relative;
  ${({ horizontal }) => (horizontal ? 'margin-right: 0.75rem;' : 'margin-bottom: 0.75rem;')}
  cursor: pointer;
`;

const Thumbnail = styled.img`
  height: 2.75rem;
  width: 2.75rem;
  object-fit: cover;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ selected }) => (selected ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))' : 'none')};
  border: ${({ selected }) => (selected ? '2px solid #FFFFFF' : 'none')};
  box-sizing: border-box;
`;

class NavigationThumbnails extends Component {
  handleThumbnailClick = (idx) => () => {
    const { onClick } = this.props;
    onClick(idx);
  }

  render() {
    const { images, selected, horizontal } = this.props;
    return (
      <ThumbnailsWrapper horizontal={horizontal}>
        {
          images.map((image, idx) => (
            <ImageWrapper key={image.id} onClick={this.handleThumbnailClick(idx)} horizontal={horizontal}>
              <Thumbnail
                src={image.thumbnails ? image.thumbnails.tiny : ''}
              />
              <SelectedIndicator selected={selected === idx} />
            </ImageWrapper>
          ))
        }
      </ThumbnailsWrapper>
    );
  }
}

NavigationThumbnails.defaultProps = {
  images: [],
};

NavigationThumbnails.propTypes = {
  images: PropTypes.array,
  selected: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
};

export default NavigationThumbnails;
