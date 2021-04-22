import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import ArtworkUID from 'molecules/ArtworkUID';
import ReactResizeDetector from 'react-resize-detector';
import Responsive from 'react-responsive';
import ArtworkCardImage from 'molecules/ArtworkCardImage';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './slider.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ImageStub = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[30]};
  height: 15rem;
  width: 100%;
  cursor: pointer;
`;

const Dot = styled.div`
  width: 0.3125rem;
  height: 0.3125rem;
  background-color: ${({ active }) => (active ? '#FF5F0E' : '#C9CBCC')};
  border-radius: 50%;
  cursor: pointer;
  margin-left: 0.25rem;
`;

const DotsContainer = styled.div`
  margin: 0.25rem 0 0 0;
  display: flex;
  justify-content: flex-end;
`;

class ArtworkCard extends React.PureComponent {
  state = {
    selectedImageIndex: 0,
    containerWidth: null,
  };

  componentDidMount() {
    const { onCardReady, artwork, images } = this.props;
    
    const imgs = Array.isArray(images) ? images : images.artwork_data.images;

    if (!imgs.length) {
      onCardReady();
    }

    this.setState({ containerWidth: this.container.clientWidth });
  }

  sortImages = (img1, img2) => img1.order - img2.order

  handleFirstImageLoaded = () => {
    this.props.onCardReady();
  }

  handleFirstImageError = () => {
    this.props.onCardReady();
  }

  handleResize = (width) => {
    this.props.onResize({ width });
  }

  renderImages = (images) => {
    const { artwork: { id }, onArtworkClick, currentWidth } = this.props;
    const { selectedImageIndex, containerWidth } = this.state;
    const img = images && images[0];
    const aspectRatio = img ? img.image_original_width / img.image_original_height : 1;
    
    return images && images.sort(this.sortImages).map((image, idx) => (
      <ReactResizeDetector handleWidth key={image.id} onResize={this.handleResize}>
        {(width) => {
          let imageWidth = width;
          const isWidthDefined = Number.isFinite(width);
          if (!isWidthDefined) {
            imageWidth = containerWidth || currentWidth;
          }
          if (idx > 0 && !imageWidth) {
            return <Fragment />;
          }
          return (
            <ArtworkCardImage
              onClick={onArtworkClick(id)}
              onLoad={idx === 0 ? this.handleFirstImageLoaded : null}
              onError={idx === 0 ? this.handleFirstImageError : null}
              width={imageWidth}
              image={image}
              aspectRatio={aspectRatio}
              loadHighResImage={idx === selectedImageIndex}
            />
          );
        }}
      </ReactResizeDetector>
    ));
  }

  RenderDots = ({ isCollection, images }) => {
    // const { artwork } = this.props;
    const { selectedImageIndex } = this.state;

    if (images.length < 2) {
      return '';
    }

    return (
      <DotsContainer>
        {images.sort(this.sortImages).map((img, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Dot key={idx} active={selectedImageIndex === idx} onClick={this.handleDotClick(idx)} />
        ))}
      </DotsContainer>
    );
  }

  RenderLabel = () => {
    const { artwork } = this.props;
    const title = artwork.title || 'Untitled';
    const year = artwork.year ? `, ${artwork.year}` : '';
    return (
      <Typography>{`${title}${year}`}</Typography>
    );
  }

  RenderCarousel = ({ images }) => {
    const { selectedImageIndex } = this.state;
    const settings = {
      showArrows: false,
      showStatus: false,
      showIndicators: false,
      showThumbs: false,
    };

    // console.log('images -> ', images);

    if (Array.isArray(images) && images.length > 1) {
      return (
        <Carousel {...settings} selectedItem={selectedImageIndex} onChange={this.handleSwipe}>
          {this.renderImages(images)}
        </Carousel>
      )
    }

    return <Fragment>
      {this.renderImages(images)}
    </Fragment>
  }

  RenderImageView = ({ images, artwork, onArtworkClick }) => {
    const RenderCarousel = this.RenderCarousel;

    return <RenderCarousel images={images} />

    // return <ImageStub onClick={onArtworkClick(artwork.id)} />    
  }

  handleDotClick = (dotIdx) => () => {
    this.setState({ selectedImageIndex: dotIdx });
  }

  handleSwipe = (idx) => {
    if (this.state.selectedImageIndex !== idx) {
      this.setState({ selectedImageIndex: idx });
    }
  }

  render() {
    const {
      artwork, images, onArtworkClick, hideMeta, isCollection,
    } = this.props;

    const RenderDots = this.RenderDots;
    const RenderLabel = this.RenderLabel;
    const RenderImageView = this.RenderImageView;

    // console.log('images -> ', images);

    return (
      <Container ref={(el) => { this.container = el; }}>
        <RenderImageView images={Array.isArray(images) ? images : images.artwork_data.images} artwork={artwork} onArtworkClick={onArtworkClick} />
        <Responsive minWidth={991}>
          <RenderDots 
            isCollection={isCollection}
            images={Array.isArray(images) ? images : images.artwork_data.images} />
        </Responsive>
        {!hideMeta && (
          <Fragment>
            <RenderLabel />
            <ArtworkUID id={artwork.id} />
          </Fragment>
        )}
      </Container>
    );
  }
}

ArtworkCard.propTypes = {
  artwork: PropTypes.object.isRequired,
  onArtworkClick: PropTypes.func.isRequired,
  onCardReady: PropTypes.func,
  hideMeta: PropTypes.bool,
  onResize: PropTypes.func.isRequired,
  currentWidth: PropTypes.number,
  isCollection: PropTypes.bool,
};

ArtworkCard.defaultProps = {
  onCardReady: () => { },
};

export default ArtworkCard;
