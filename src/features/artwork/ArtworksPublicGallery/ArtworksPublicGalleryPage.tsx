import React from 'react';
import { useSelector } from 'react-redux';
import PageTemplate from '../../../templates/PageTemplate';
import ArtworksPublicGallery from './ArtworksPublicGallery';

import publicGallerySelector from '../selectors/publicGallerySelector';

const ArtworksPublicGalleryPage = (location) => {
    const { artworks, isLoading, hasMore, publicInfo } = useSelector(publicGallerySelector('fetch'));

    // console.log('ArtworksPublicGalleryPage');

    return  (
        <PageTemplate 
            location={location}
            publicInfo={publicInfo}
            isLoading={isLoading}>
            <ArtworksPublicGallery 
                artworks={artworks}
                hasMore={hasMore} />
        </PageTemplate>
    );
}

export default ArtworksPublicGalleryPage;
