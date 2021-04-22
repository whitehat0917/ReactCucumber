import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fetchImage } from 'utils/artworks';
import ReactResizeDetector from 'react-resize-detector';

const SlideContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  cursor: ${({ isCollection }) => (isCollection ? 'pointer' : 'zoom-in')};
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: ${({ width, isCollection }) => !isCollection ? `${width}px` : '100%'};
  height: ${({ height, isCollection }) => !isCollection ? `${height}px` : '100%'};
`;

const Image = styled.img`
  display: block !important;
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width:  ${({ isCollection, isLandscape }) => !isCollection && !isLandscape ? '100% !important' : 'auto !important' };
  height: ${({ isCollection }) => !isCollection ? 'auto !important' : ''};
  margin: auto;
  ${({ blurred }) => (blurred ? 'filter: blur(8px);' : '')}
  transition: filter 0.3s;  
`;

class ArtworkProgressiveImage extends React.Component {
  unmounted = false

  constructor(props) {
    super(props);
    let isCached = false;
    let url = this.getImageUrl('mini');
    const highestRes = this.getHighestResCached();
    if (highestRes) {
      if (highestRes === 'small' || highestRes === 'mid') {
        isCached = true;
        if (props.onLoad) {
          props.onLoad();
        }
      }
      url = this.getImageUrl(highestRes);
    }
    this.state = {
      src: url,
      originalImageLoaded: isCached,
    };

    if (props.loadHighResImage && props.loadHighResInBackground) {
      this.fetchHighResImageInBackground();
    }
  }

  componentDidMount() {
    const { loadHighResImage, onLoad } = this.props;
    const { originalImageLoaded } = this.state;
    if (!originalImageLoaded && loadHighResImage) {

      this.fetchOriginalImage().then((url) => {

        if (url && !this.unmounted) {

          this.setState({ src: url, originalImageLoaded: true });

          if (onLoad) {
            onLoad();
          }
          
        }
      }).catch(() => {});
    }
  }

  componentDidUpdate(prevProps) {
    const { loadHighResImage, loadHighResInBackground, onLoad } = this.props;
    const { originalImageLoaded } = this.state;
    if (!prevProps.loadHighResImage && loadHighResImage && !originalImageLoaded) {
      this.fetchOriginalImage().then((url) => {
        if (url && !this.unmounted) {
          this.setState({ src: url, originalImageLoaded: true });
          if (onLoad) {
            onLoad();
          }
        }
      }).catch(() => {});
    }
    if (!prevProps.loadHighResImage && loadHighResImage && loadHighResInBackground) {
      this.fetchHighResImageInBackground();
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  fetchOriginalImage = () => {
    const url = this.getOriginalImageUrl();
    return fetchImage(url);
  }

  fetchHighResImageInBackground = () => {
    const url = this.getImageUrl('mid');
    fetchImage(url);
  }

  isCached = (src) => {
    const img = new window.Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.src = src;
    const { complete } = img;
    img.src = '';
    return complete;
  }

  getOriginalImageUrl = () => this.getImageUrl('small') || this.getImageUrl('mid')

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

  handleResize = () => {
    const { setActiveImageHeight } = this.props;
    
    if (setActiveImageHeight) {
      setActiveImageHeight(100);
    }
  }

  RenderImage = ({ 
    src,
    image,
    screenWidth,
    screenHeight,
    height,
    isCollection,
    isFullScreen,
    isLandscape,
    blured
  }) => {
    if (src) {
      // const imageHeight = (screenHeight < 800) 
      //   ? (screenHeight < 700 && screenHeight > 600) ? (screenHeight / 1.6) : (screenHeight / 1.8) 
      //   : (screenHeight / 1.5);

      return (
        <ImageContainer 
          image={image}
          width={screenWidth}
          height={height ? height : screenHeight }
          isLandscape={screenWidth > screenHeight} 
          isFullScreen={isFullScreen}
          isCollection={isCollection}>
          <Image
            crossOrigin=""
            src={src}
            width={screenWidth}
            height={screenHeight || height}
            isFullScreen={isFullScreen}
            isCollection={isCollection}
            isLandscape={isLandscape}
            blurred={blured}
          />
        </ImageContainer>
      );
    }

    return null;
  }

  render() {
    const {
      onClick, style, isCollection, image, isFullScreen, activeImageHeight, height
    } = this.props;
    const { src, originalImageLoaded } = this.state;

    const RenderImage = this.RenderImage;

    return (
      <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}>
        {( screenWidth, screenHeight ) => (
          <SlideContainer isCollection={isCollection} onClick={onClick}>
            {!src && (
              <span>Loading image</span>
            )}
            <RenderImage
              src={src}
              image={image}
              screenWidth={screenWidth}
              screenHeight={screenHeight}
              height={height}
              isLandscape={screenWidth > screenHeight} 
              isFullScreen={isFullScreen}
              isCollection={isCollection} 
              blurred={!originalImageLoaded} />
          </SlideContainer>
        )}
      </ReactResizeDetector>
    );
  }
}

ArtworkProgressiveImage.defaultProps = {
  style: {},
};

ArtworkProgressiveImage.propTypes = {
  onClick: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.string,
  image: PropTypes.object.isRequired,
  loadHighResImage: PropTypes.bool,
  onLoad: PropTypes.func,
  loadHighResInBackground: PropTypes.bool,
  style: PropTypes.shape({}),
  isCollection: PropTypes.bool,
};

export default ArtworkProgressiveImage;
