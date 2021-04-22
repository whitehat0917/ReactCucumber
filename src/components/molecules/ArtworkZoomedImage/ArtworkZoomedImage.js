import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'atoms/Icon';
import Responsive from 'react-responsive';
import { fetchImage } from 'utils/artworks';

const Mobile = (props) => <Responsive {...props} maxWidth={768} />;

const ZoomedImageContainer = styled.div`
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: zoom-out;
  background-color: rgba(7, 7, 10, 0.9);
  box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;
  align-items: center;
`;

const ZoomedImage = styled.img`
  z-index: 11;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  height: 100%;
  min-height: 100%;
`;

const StyledIcon = styled(Icon)`
  position: fixed;
  right: 1.5rem;
  top: 1rem;
  z-index: 100;
`;

class ArtworkZoomedImage extends Component {
  unmounted = false

  constructor(props) {
    super(props);
    let isCached = false;
    let url = this.getImageUrl('small');
    const highestRes = this.getHighestResCached();
    if (highestRes && highestRes === 'mid') {
      isCached = true;
      url = this.getImageUrl(highestRes);
    }
    this.state = {
      src: url,
      originalImageLoaded: isCached,
    };
  }

  componentDidMount() {
    const { originalImageLoaded } = this.state;
    if (!originalImageLoaded) {
      this.fetchOriginalImage().then((url) => {
        if (url && !this.unmounted) {
          this.setState({ src: url, originalImageLoaded: true });
        }
      }).catch(() => {});
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchOriginalImage = () => {
    const url = this.getOriginalImageUrl();
    return fetchImage(url);
  }

  isCached = (src) => {
    const img = new window.Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.src = src;
    const { complete } = img;
    img.src = '';
    return complete;
  }

  getOriginalImageUrl = () => this.getImageUrl('mid')

  getImageUrl = (type) => {
    const { image } = this.props;
    if (image.thumbnails && image.thumbnails[type]) {
      return image.thumbnails[type];
    }
    return null;
  }

  getHighestResCached = () => {
    const resolutions = ['mid', 'small', 'tiny', 'mini'];
    return resolutions.find((res) => this.isCached(this.getImageUrl(res)));
  }

  render() {
    const { onClick } = this.props;
    const { src, originalImageLoaded } = this.state;
    return (
      <ZoomedImageContainer onClick={onClick}>
        <Mobile>
          <StyledIcon
            size={0.75}
            onClick={onClick}
            clickable
            color="white"
          >
            close
          </StyledIcon>
        </Mobile>
        {!src && (
          <span>Loading image</span>
        )}
        {src && (
          <ZoomedImage
            crossOrigin=""
            src={src}
            blurred={!originalImageLoaded}
          />
        )}
      </ZoomedImageContainer>
    );
  }
}

ArtworkZoomedImage.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.object,
};

export default ArtworkZoomedImage;
