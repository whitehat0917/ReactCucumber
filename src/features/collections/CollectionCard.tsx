import React, { Fragment } from 'react';
import _ from 'lodash';
import CollectionThumbnails from './CollectionThumbnails';
import { useMediaQuery } from 'react-responsive';
import {
  ArtworkContainer,
  ArtWorkCard,
  StyledTypography,
  Wrapper,
  ArtworksAmount
} from './styled';

import {
  fullWidth,
  twoCardsSizes,
  threeCardsSizes,
  fourCardsSizes,
  twoCardsPositions,
  threeCardsPositions,
  fourCardsPositions,
  FIRST_ELEMENT,
  ONE_CARD,
  TWO_CARDS,
  THREE_CARDS,
} from './card.config';

const CARDS_LIMIT = 4;

const RenderCards = ({ 
  artworks, 
  positions,
  sizes }) => {
  return artworks
    .filter((artwork, idx) => idx < CARDS_LIMIT)
    .map((artwork, idx) => (
      <ArtWorkCard 
          key={idx}
          position={positions[idx]}
          width={sizes[idx]}>
          <CollectionThumbnails
            images={artwork.artwork_data.images[FIRST_ELEMENT]}
          />
        </ArtWorkCard>
    ));
}


const RenderArtworkCards = ({ artworks, cardsAmount }) => {
  // const screenSizes = [
  //   { query: '(min-width: 1440px)', size: '49.325%' },
  //   { query: '(min-width: 1024px) and (max-width: 1439px)', size: '49.07%' },
  //   { query: '(min-width: 375px) and (max-width: 1023px)', size: '48.72%' },
  //   { query: '(max-width: 374px)', size: '48.48%' },
  // ];
  // const {size} = screenSizes.find(el => useMediaQuery({ query: el.query }));
  const isXL = useMediaQuery({ query: '(min-width: 1440px)' });
  const isL = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1439px)' });
  const isM = useMediaQuery({ query: '(min-width: 375px) and (max-width: 1023px)' });
  const isXS = useMediaQuery({ query: '(max-width: 374px)' });
  let size = '48%';
  if (isXL) {
    size = '49.325%';
  } else if (isL) {
    size = '49.07%';
  } else if (isM) {
    size = '48.72%'
  } else if (isXS) {
    size = '48.48%'
  }
  switch (cardsAmount.toString()) {
    case TWO_CARDS:
      return <RenderCards
        artworks={artworks}
        sizes={twoCardsSizes}
        positions={twoCardsPositions} />
    case THREE_CARDS:
      return <RenderCards
        artworks={artworks}
        sizes={threeCardsSizes(size)}
        positions={threeCardsPositions} />
    case ONE_CARD:
      return <RenderCards
        artworks={artworks}
        sizes={fullWidth}
        positions={fullWidth} />
    default:
      return <RenderCards
        artworks={artworks}
        sizes={fourCardsSizes(size)}
        positions={fourCardsPositions} />
  }
};

const CollectionCard = ({ artworks, name, artworksAmount }) => {
  const cardsAmount = artworks.length.toString();
  const sortedArtworks = artworks.sort((a, b) => a.order - b.order);

  return (
    <Fragment>
      <ArtworkContainer>
        <RenderArtworkCards 
          artworks={sortedArtworks} 
          cardsAmount={cardsAmount} />
      </ArtworkContainer>
      <StyledTypography type="subtitle2">
        {name}
      </StyledTypography>
      <ArtworksAmount>{`${artworksAmount} Artworks`}</ArtworksAmount>
    </Fragment>
  );
};

// ArtworksCollectionCard.propTypes = {
//   name: PropTypes.string,
//   artworks: PropTypes.arrayOf(PropTypes.shape({
//     artwork: PropTypes.string,
//     order: PropTypes.number,
//     artwork_data: PropTypes.shape({
//       images: PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.string,
//       })),
//     }),
//   })).isRequired,
// };

export default CollectionCard;
