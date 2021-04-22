import React from 'react';
import { useSelector } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import PublicGallery from './PublicGallery';

import publicGallerySelector from './selectors';

const PublicGalleryPage = (location) => {
    const { artworks, isLoading, hasMore, publicInfo } = useSelector(publicGallerySelector('fetch'));

    // console.log('ArtworksPublicGalleryPage');

    return  (
        <PageTemplate 
            location={location}
            publicInfo={publicInfo}
            isLoading={isLoading}>
            <PublicGallery 
                artworks={artworks}
                hasMore={hasMore} />
        </PageTemplate>
    );
}

export default PublicGalleryPage;
