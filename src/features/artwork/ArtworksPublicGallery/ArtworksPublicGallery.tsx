/* eslint-disable camelcase */
import React, { Fragment } from 'react';

import { GridWrapper } from './styled';
import ArtworksGrid from './ArtworksGrid';

const ArtworksPublicGallery = ({
    artworks,
    hasMore,
}) => {
    return (
        <Fragment>
            <GridWrapper>
                {artworks.length && (
                    <ArtworksGrid
                        artworks={artworks}
                        hasMore={hasMore}
                    />
                )}
            </GridWrapper>
        </Fragment>
    )
}

export default ArtworksPublicGallery;
