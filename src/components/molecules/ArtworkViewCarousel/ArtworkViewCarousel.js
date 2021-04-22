import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Carousel as DefaultCarousel } from 'react-responsive-carousel';
import ReactResizeDetector from 'react-resize-detector';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import ArtworkProgressiveImage from 'molecules/ArtworkProgressiveImage';
import ArtworkZoomedImage from 'molecules/ArtworkZoomedImage';
import NavigationThumbnails from 'molecules/NavigationThumbnails';
import Icon from 'atoms/Icon';

const Carousel = styled(DefaultCarousel)`
  .carousel .slide {
    background-color: transparent !important;
}`;

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
`;

const ZoomIcon = styled(Icon)`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  z-index: 2;
`;

const ZoomedImage = ({ onImageClick, image }) => ReactDOM.createPortal(<ArtworkZoomedImage
  onClick={onImageClick}
  image={image}
/>, document.body);

class ArtworkViewCarousel extends React.PureComponent {
  state = {
    selectedImageIndex: 0,
    showZoomedImage: false,
  }

  handleThumbnailClick = (imageIdx) => {
    this.setState({ selectedImageIndex: imageIdx });
  }

  handleSwipe = (imageIdx) => {
    if (this.state.selectedImageIndex !== imageIdx) {
      this.setState({ selectedImageIndex: imageIdx });
    }
  }

  handleOnImageClick = () => {
    const { type } = this.props;
    if (type === 'desktop') {
      this.setState({ showZoomedImage: true });
    }
  }

  handleOnMobileZoomClick = () => {
    this.setState({ showZoomedImage: true });
  }

  handleOnZoomedImageClick = (e) => {
    e.stopPropagation();
    this.setState({ showZoomedImage: false });
  }

  handleWrapperClick = (e) => {
    e.stopPropagation();
  }

  render() {
    const { selectedImageIndex, showZoomedImage } = this.state;
    const { images, type, onLoad } = this.props;
    const settings = {
      showArrows: false,
      showStatus: false,
      showIndicators: false,
      showThumbs: false,
    };
    return (
      <Fragment>
        {
          type === 'mobile'
          && (
          <ZoomIcon
            size={1}
            onClick={this.handleOnMobileZoomClick}
            clickable
            color="white"
          >
            zoom
          </ZoomIcon>
          )
        }
        <ReactResizeDetector handleWidth handleHeight>
          {((width, height) => {
            const defaultWidth = 100;
            if (!width) {
              return <div />;
            }
            let options = {};

            if (type === 'desktop') {
              const selectedImage = images[selectedImageIndex];
              const yScale = selectedImage ? images[selectedImageIndex].image_original_height / height : 1;
              const imageWidth = selectedImage ? Math.floor(images[selectedImageIndex].image_original_width / yScale) : defaultWidth;
              options = {
                wrapperStyle: {
                  width: imageWidth,
                },
                imageStyle: {
                  height,
                },
                thumbnailsWrapperStyle: {
                  height,
                  width: '2.875rem',
                  marginLeft: '1rem',
                  flexShrink: 0,
                },
              };
            } else if (type === 'mobile') {
              const selectedImage = images[0];
              const origWidth = selectedImage ? selectedImage.image_original_width : defaultWidth;
              const origHeight = selectedImage ? selectedImage.image_original_height : defaultWidth;
              const newHeight = (origHeight * width) / origWidth;
              options = {
                wrapperStyle: {
                  width,
                  height: newHeight,
                },
                imageStyle: {
                  height: newHeight,
                },
                thumbnailsWrapperStyle: {
                  height: '3rem',
                  width,
                  marginTop: '1rem',
                },
              };
            }

            return (
              <Wrapper horizontal={type === 'desktop'} onClick={this.handleWrapperClick}>
                <div style={options.wrapperStyle}>
                  <Carousel {...settings} onChange={this.handleSwipe} selectedItem={selectedImageIndex}>
                    {
                      images.map((image, idx) => (
                        <ArtworkProgressiveImage
                          key={image.id}
                          loadHighResImage={idx === selectedImageIndex}
                          image={image}
                          height={options.imageStyle.height}
                          onClick={this.handleOnImageClick}
                          onLoad={onLoad}
                          loadHighResInBackground
                        />
                      ))
                    }
                  </Carousel>
                </div>
                {images.length > 1 && (
                  <div style={options.thumbnailsWrapperStyle}>
                    <Scrollbars>
                      <NavigationThumbnails
                        onClick={this.handleThumbnailClick}
                        images={images}
                        selected={selectedImageIndex}
                        horizontal={type === 'mobile'}
                      />
                    </Scrollbars>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </ReactResizeDetector>
        {
          showZoomedImage
          && (
          <ZoomedImage
            onImageClick={this.handleOnZoomedImageClick}
            image={images[selectedImageIndex]}
          />)
        }
      </Fragment>
    );
  }
}

ArtworkViewCarousel.propTypes = {
  artworkId: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    image_original_height: PropTypes.number.isRequired,
  })).isRequired,
  type: PropTypes.oneOf(['desktop', 'mobile']),
  onLoad: PropTypes.func,
};

ArtworkViewCarousel.defaultProps = {
  type: 'desktop',
};


export default ArtworkViewCarousel;
