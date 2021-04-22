import ArtworkUID from 'molecules/ArtworkUID';
import React, { Fragment } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 } from 'uuid';
import ArtworkCardImage from './ArtworkCardImage';
import { Dot, DotsContainer, DotsHolder, EditLink } from './styled';

const ArtworkCard = ({ images, artwork, nextArtwork, isPrivate, itemWidth }) => {
  const settings = {
    dots: true,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    appendDots: (dots) => {
      return (
        <DotsContainer>
          <DotsHolder>
            {dots.map((dot) => (
              <Dot key={v4()} {...dot.props} onClick={dot.props.children.props.onClick} />
            ))}
          </DotsHolder>
        </DotsContainer>
      );
    },
  };
  if (!images?.length) {
    return <div>no image</div>;
  }

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, idx) => (
          <ReactResizeDetector handleWidth key={`${artwork.id}-${idx}`}>
            {(width) => {
              let imageWidth = itemWidth || width;

              const aspectRatio = image ? image.image_original_width / image.image_original_height : 1;
              const imageHeight = width ? (width / aspectRatio).toString() : image.image_original_height / 2;

              if (idx > 0 && !imageWidth) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <ArtworkCardImage
                    nextArtwork={nextArtwork}
                    artwork={artwork}
                    width={imageWidth}
                    height={imageHeight}
                    image={image}
                    isPrivate={isPrivate}
                  />
                </Fragment>
              );
            }}
          </ReactResizeDetector>
        ))}
      </Slider>
      {isPrivate && (
        <EditLink to={`/${artwork.id}/edit`}>
          <ArtworkUID id={artwork.id} />
        </EditLink>
      )}
    </div>
  );
};

export default ArtworkCard;
