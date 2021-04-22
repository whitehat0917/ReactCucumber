import Icon from 'components/Icon';
import { useAsyncRetryElement } from 'features/core/hooks/useAsyncElement';
import { I18nText } from 'features/core/i18n/I18nText';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { FlexCenteredWrapper } from 'styled';
import styled from 'styled-components';
import { fixFn } from 'utils/func.utils';
import { ArtworkImage, BlurWrapper, ImageContainer } from '../../collection/SingleCollectionPage/styled';
const OverlayLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  background: ${({ theme }) => theme.palette.gray['10']};
}`;

const OverlayErrror = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  padding-left:2rem;
  padding-right:2rem;
  padding-top:1rem;
  padding-bottom:0.5rem;
  align-items:center;
  background: ${({ theme }) => theme.palette.gray['10']};
  
}`;
const TickContainer = styled.div`
  padding: 0.5rem;
  border: 3px solid #919191;
  border-radius: 50%;
`;
const ArtworkCardImage = ({ image, width, artwork, isPrivate }) => {
  const { url } = useRouteMatch();
  const [imgUrl, setUrl] = useState(null as string);
  const initialUrl = image?.thumbnails?.mid;
  const { loading, error, showLoader, onStart, onSuccess, onError } = useAsyncRetryElement(
    (count) => {
      if (count) {
        setUrl(`${initialUrl}?v=${Date.now()}`);
      } else {
        setUrl(initialUrl);
      }
    },
    1000,
    30,
    3,
  );
  useEffect(() => {
    setUrl(initialUrl);
    onStart();
  }, [initialUrl]);

  const aspectRatio = image ? image.image_original_width / image.image_original_height : 1;

  return (
    <ImageContainer
      to={isPrivate ? `/${artwork.id}/edit` : `${url}/artwork/${artwork.artwork}`}
      width={width}
      height={(width / aspectRatio).toString() || '100%'}
    >
      <BlurWrapper style={{ position: 'relative' }}>
        {/* {!src && (
                    <ImageStub
                        width={width}
                        // height={(width / aspectRatio) || '100%'}
                        onClick={(e) => { e.stopPropagation(); }}
                    />
                )} */}

        <ArtworkImage
          loaded={!loading}
          src={imgUrl}
          onLoad={onSuccess}
          onError={fixFn(setTimeout, onError, 1000)}
          width={width}
          height={(width / aspectRatio).toString() || '100%'}
        />
        {showLoader && (
          <OverlayLoader>
            <PulseLoader></PulseLoader>
          </OverlayLoader>
        )}
        {error && (
          <OverlayErrror>
            <FlexCenteredWrapper>
              <TickContainer>
                <Icon size={1}>tick</Icon>
              </TickContainer>
            </FlexCenteredWrapper>
            <I18nText msgKey="refresh.to.see.thumb" type="caption" color="#919191" centered />
          </OverlayErrror>
        )}
      </BlurWrapper>
    </ImageContainer>
  );
};

// class ArtworkCardImage extends React.PureComponent {
//   unmounted = false

//   loadEventFired = false

//   constructor(props) {
//     super(props);
//     let isCached = false;
//     let url = '';
//     const highestRes = this.getHighestResCached();
//     if (highestRes) {
//       if (highestRes === 'small' || highestRes === 'mid' || highestRes === 'original') {
//         isCached = true;
//       }
//       url = this.getImageUrl(highestRes);
//     } else {
//       url = this.getPreviewUrl() || this.getOriginalImageUrl();
//     }
//     this.state = {
//       src: url,
//       originalImageLoaded: isCached,
//     };
//   }

//   componentDidUpdate(prevProps) {
//     const { loadHighResImage } = this.props;
//     const { originalImageLoaded } = this.state;
//     if (!prevProps.loadHighResImage && loadHighResImage && !originalImageLoaded) {
//       this.fetchOriginalImage().then((url) => {
//         if (url && !this.unmounted) {
//           this.setState({ src: url, originalImageLoaded: true });
//         }
//       }).catch(() => {});
//     }
//   }

//   componentWillUnmount() {
//     this.unmounted = true;
//   }

//   requestHigherResImage = (currentType) => {
//     let url = null;
//     switch (currentType) {
//       case 'mini':
//         url = this.getImageUrl('tiny');
//         break;
//       case 'tiny':
//         url = this.getImageUrl('small');
//         break;
//       case 'small':
//         url = this.getImageUrl('mid');
//         break;
//       case 'mid':
//         url = this.getImageUrl('original');
//         break;
//       default:
//     }
//     if (url) {
//       return fetchImage(url);
//     }
//     return Promise.reject(url);
//   }

//   fetchOriginalImage = () => {
//     const url = this.getOriginalImageUrl();
//     return fetchImage(url);
//   }

//   isCached = (src) => {
//     const img = new window.Image();
//     img.setAttribute('crossorigin', 'anonymous');
//     img.src = src;
//     const { complete } = img;
//     img.src = '';
//     return complete;
//   }

//   getOriginalImageUrl = () => this.getImageUrl('small') || this.getImageUrl('mid') || this.getImageUrl('original')

//   getImageUrl = (type) => {
//     const { image } = this.props;
//     if (type === 'original') {
//       return image.image_original || null;
//     }
//     if (image.thumbnails && image.thumbnails[type]) {
//       return image.thumbnails[type];
//     }
//     return null;
//   }

//   getImageTypeByUrl = (url) => {
//     if (!url) {
//       return null;
//     }
//     const match = /.+_(tiny|mini|small|mid)\..+/.exec(url);
//     if (!match) {
//       return 'original';
//     }
//     return match[1];
//   }

//   getPreviewUrl = () => this.getImageUrl('mini') || this.getImageUrl('tiny')

//   getHighestResCached = () => {
//     const resolutions = ['original', 'mid', 'small', 'tiny', 'mini'];
//     return resolutions.find((res) => this.isCached(this.getImageUrl(res)));
//   }

//   handleImageLoaded = (e) => {
//     const { originalImageLoaded } = this.state;
//     const { onLoad, loadHighResImage } = this.props;
//     if (!originalImageLoaded && loadHighResImage) {
//       this.fetchOriginalImage().then((url) => {
//         if (url && !this.unmounted) {
//           this.setState({ src: url, originalImageLoaded: true });
//         }
//       }).catch(() => {});
//     }
//     if (!this.loadEventFired) {
//       if (onLoad) {
//         onLoad(e);
//       }
//       this.loadEventFired = true;
//     }
//   }

//   handleImageError = (e) => {
//     const { onError } = this.props;
//     if (e.target.src !== this.getImageUrl('original')) {
//       this
//         .requestHigherResImage(this.getImageTypeByUrl(e.target.src))
//         .then((url) => {
//           this.setState({ src: url });
//         })
//         .catch((url) => {
//           this.setState({ src: url });
//         });
//     } else if (onError) {
//       onError(e);
//     }
//   }

//   render() {
//     const {
//       onClick, width, aspectRatio,
//     } = this.props;
//     const { src, originalImageLoaded } = this.state;
//     return (
//       <ImageContainer onClick={onClick}>
//         <BlurWrapper blurred={!originalImageLoaded}>
//           {!src && (
//           <ImageStub
//             width={width}
//             height={(width / aspectRatio) || '100%'}
//             onClick={(e) => { e.stopPropagation(); }}
//           />
//           )}
//           {src && (
//           <Image
//             crossOrigin=""
//             src={src}
//             onLoad={this.handleImageLoaded}
//             onError={this.handleImageError}
//             width={width}
//             height={(width / aspectRatio) || '100%'}
//           />
//           )}
//         </BlurWrapper>
//       </ImageContainer>
//     );
//   }
// }

// ArtworkCardImage.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   onLoad: PropTypes.func,
//   onError: PropTypes.func,
//   width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   image: PropTypes.object.isRequired,
//   aspectRatio: PropTypes.number,
//   loadHighResImage: PropTypes.bool,
// };

// ArtworkCardImage.defaultProps = {
//   aspectRatio: 0.75,
//   width: '100%',
// };

export default ArtworkCardImage;
