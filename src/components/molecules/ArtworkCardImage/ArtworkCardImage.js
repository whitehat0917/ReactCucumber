import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fetchImage } from 'utils/artworks';

const ImageContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
`;

const BlurWrapper = styled.div`
  ${({ blurred }) => (blurred ? 'filter: blur(8px);' : '')}
  transition: filter 0.3s;  
`;

const ImageStub = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[30]};
  height: 15rem;
  width: 100%;
  cursor: pointer;
`;

const Image = styled.img`
  object-fit: contain;
`;

class ArtworkCardImage extends React.PureComponent {
  unmounted = false

  loadEventFired = false

  constructor(props) {
    super(props);
    let isCached = false;
    let url = '';
    const highestRes = this.getHighestResCached();
    if (highestRes) {
      if (highestRes === 'small' || highestRes === 'mid' || highestRes === 'original') {
        isCached = true;
      }
      url = this.getImageUrl(highestRes);
    } else {
      url = this.getPreviewUrl() || this.getOriginalImageUrl();
    }
    this.state = {
      src: url,
      originalImageLoaded: isCached,
    };
  }

  componentDidUpdate(prevProps) {
    const { loadHighResImage } = this.props;
    const { originalImageLoaded } = this.state;
    if (!prevProps.loadHighResImage && loadHighResImage && !originalImageLoaded) {
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

  requestHigherResImage = (currentType) => {
    let url = null;
    switch (currentType) {
      case 'mini':
        url = this.getImageUrl('tiny');
        break;
      case 'tiny':
        url = this.getImageUrl('small');
        break;
      case 'small':
        url = this.getImageUrl('mid');
        break;
      case 'mid':
        url = this.getImageUrl('original');
        break;
      default:
    }
    if (url) {
      return fetchImage(url);
    }
    return Promise.reject(url);
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

  getOriginalImageUrl = () => this.getImageUrl('small') || this.getImageUrl('mid') || this.getImageUrl('original')

  getImageUrl = (type) => {
    const { image } = this.props;
    if (type === 'original') {
      return image.image_original || null;
    }
    if (image.thumbnails && image.thumbnails[type]) {
      return image.thumbnails[type];
    }
    return null;
  }

  getImageTypeByUrl = (url) => {
    if (!url) {
      return null;
    }
    const match = /.+_(tiny|mini|small|mid)\..+/.exec(url);
    if (!match) {
      return 'original';
    }
    return match[1];
  }

  getPreviewUrl = () => this.getImageUrl('mini') || this.getImageUrl('tiny')

  getHighestResCached = () => {
    const resolutions = ['original', 'mid', 'small', 'tiny', 'mini'];
    return resolutions.find((res) => this.isCached(this.getImageUrl(res)));
  }

  handleImageLoaded = (e) => {
    const { originalImageLoaded } = this.state;
    const { onLoad, loadHighResImage } = this.props;
    if (!originalImageLoaded && loadHighResImage) {
      this.fetchOriginalImage().then((url) => {
        if (url && !this.unmounted) {
          this.setState({ src: url, originalImageLoaded: true });
        }
      }).catch(() => {});
    }
    if (!this.loadEventFired) {
      if (onLoad) {
        onLoad(e);
      }
      this.loadEventFired = true;
    }
  }

  handleImageError = (e) => {
    const { onError } = this.props;
    if (e.target.src !== this.getImageUrl('original')) {
      this
        .requestHigherResImage(this.getImageTypeByUrl(e.target.src))
        .then((url) => {
          this.setState({ src: url });
        })
        .catch((url) => {
          this.setState({ src: url });
        });
    } else if (onError) {
      onError(e);
    }
  }

  render() {
    const {
      onClick, width, aspectRatio,
    } = this.props;
    const { src, originalImageLoaded } = this.state;
    return (
      <ImageContainer onClick={onClick}>
        <BlurWrapper blurred={!originalImageLoaded}>
          {!src && (
          <ImageStub
            width={width}
            height={(width / aspectRatio) || '100%'}
            onClick={(e) => { e.stopPropagation(); }}
          />
          )}
          {src && (
          <Image
            crossOrigin=""
            src={src}
            onLoad={this.handleImageLoaded}
            onError={this.handleImageError}
            width={width}
            height={(width / aspectRatio) || '100%'}
          />
          )}
        </BlurWrapper>
      </ImageContainer>
    );
  }
}

ArtworkCardImage.propTypes = {
  onClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.object.isRequired,
  aspectRatio: PropTypes.number,
  loadHighResImage: PropTypes.bool,
};

ArtworkCardImage.defaultProps = {
  aspectRatio: 0.75,
  width: '100%',
};

export default ArtworkCardImage;
