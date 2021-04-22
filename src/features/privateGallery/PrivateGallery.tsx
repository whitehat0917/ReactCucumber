import React from 'react';
import _ from 'lodash';
import { Artwork } from 'features/artwork/artwork-type';
import { ArtworksGrid } from 'features/artwork/ArtworksPublicGallery';
import { GridWrapper } from 'features/artwork/ArtworksPublicGallery/styled';
import { FetchStatus } from 'app/global-types';
import Typography from 'components/Typography';

interface IPrivateGallery {
    artworks: Artwork[],
    artworksUpdateId: number,
    isPrivate: boolean,
    status: FetchStatus,
    total: number
}

const PrivateGallery: React.FC<IPrivateGallery> = ({
    artworks,
    artworksUpdateId,
    isPrivate,
    status,
    total
}) => (
    <GridWrapper>
        { _.isEmpty(status.errors) && !status.errors.length
            ? <ArtworksGrid artworks={artworks} artworksUpdateId={artworksUpdateId} isPrivate={isPrivate} total={total} isLoading={status.isLoading} />
            : <Typography type="h4">{status.errors.errors}</Typography> }
    </GridWrapper>
);

export default PrivateGallery;
