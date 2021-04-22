import React, { Fragment, useState } from 'react';
import { v4 } from 'uuid';
import Masonry from 'react-masonry-component';

import LoadingOverlay from 'components/LoadingOverlay';
import ArtworkCard from './ArtworkCard';

import { CardWrapper } from './styled';
import { skeletonList, Skeleton } from 'styled';

const RenderArtworks = ({ artworks, artworksUpdateId, isPrivate, isLoading, total }) => {
    if (artworks.length) {
        let loadedArtworks = artworks.map((artwork, idx) => (
            <CardWrapper
                key={`artworkPrivateCard_${artwork.id}`}
                data-type="artworkCard"
                isNew={artwork.update_id === artworksUpdateId}
            >
                <ArtworkCard
                    isPrivate={isPrivate}
                    artwork={artwork}
                    nextArtwork={artworks[idx + 1]}
                    images={artwork.images}
                />
            </CardWrapper>
        ));

        if (!isLoading) return loadedArtworks;

        const delta = Math.min(total - loadedArtworks.length, 20);

        // Generate skeletons as placeholders for new items
        const skeletons = Array(delta)
            .fill(null)
            .map((item, idx) => (
                <CardWrapper key={`artworkNewSkel_${idx}`} data-type="artworkCard">
                <Skeleton height="200px" />
                </CardWrapper>
            ));

        return [...loadedArtworks, ...skeletons];
    }

    return skeletonList.map((item, idx) => (
        <CardWrapper key={`artworkSkel_${idx}`} data-type="artworkCard">
            <Skeleton height="200px" />
        </CardWrapper>
    ))
};

const ArtworksGrid = ({ artworks, artworksUpdateId, isPrivate, hasMore, total, isLoading }) => {
    const [isImgLoaded, setLoaded] = useState(false);

    const handleImagesLoaded = () => {
        setLoaded(true);
    }

    const masonryOptions = {
        transitionDuration: 0
    };

    return (
        <Fragment>
            <Masonry
                options={masonryOptions}
                onImagesLoaded={handleImagesLoaded}
                enableResizableChildren={false}
                updateOnEachImageLoad={true} >
                    <RenderArtworks
                        artworks={artworks}
                        artworksUpdateId={artworksUpdateId}
                        isPrivate={isPrivate}
                        total={total}
                        isLoading={isLoading}
                    />
            </Masonry>
            { !isImgLoaded && <LoadingOverlay /> }
        </Fragment>
    );
}

export default ArtworksGrid;
