import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import PublicCollections from './PublicCollections';

import { collectionsSelector } from './selectors';
import useArtistCollections from './hooks/useArtistCollections';

const COLLECTIONS_LIMIT = 8;
const ARTWORKS_LIMIT = 1000;

const PublicCollectionsPage = (location) => {
    const { hasMore } = useSelector(collectionsSelector);
    const { collections, collectionsStatus, isEmptyCollections } = useArtistCollections({
        collectionsLimit: COLLECTIONS_LIMIT,
        artworksLimit: ARTWORKS_LIMIT,
    });

    return  (
        <PageTemplate location={location} >
            <Fragment>
                <PublicCollections 
                    collectionsStatus={collectionsStatus}
                    collections={collections}
                    isEmptyCollections={isEmptyCollections}
                    hasMore={hasMore} />
            </Fragment>
        </PageTemplate>
    );
}

export default PublicCollectionsPage;
