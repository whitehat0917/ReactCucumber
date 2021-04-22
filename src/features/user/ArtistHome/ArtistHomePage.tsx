import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeTemplate from '../../../templates/PageTemplate/HomeTemplate';
import ArtistHome from './ArtistHome';

import { artistHomeSelector, STATUS_PUBLIC_INFO } from '../selectors/artistHomeSelector';
import useArtistCollections from 'features/collections/hooks/useArtistCollections';
import useArtistSocialLinks from '../hooks/useArtistSocialLinks';
import { artworksFetchRequest } from 'features/artwork/artworkSlice';
import LoadingOverlay from 'components/LoadingOverlay';
// import { useParams } from 'react-router-dom';

const COLLECTIONS_LIMIT = 50;
const ARTWORKS_LIMIT = 1000;

const ArtistHomePage = (location) => {
    const { status, publicInfo, featuredArtwork } = useSelector(artistHomeSelector(STATUS_PUBLIC_INFO));
    const { collections, collectionsStatus, isEmptyCollections } = useArtistCollections({
        collectionsLimit: COLLECTIONS_LIMIT,
        artworksLimit: ARTWORKS_LIMIT,
    });
    const socialLinks = useArtistSocialLinks(publicInfo.social_links);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(artworksFetchRequest({}));
    }, [dispatch, publicInfo]);

    return  (
        <HomeTemplate
            location={location}
            publicInfo={publicInfo}>
            <ArtistHome
                publicInfo={publicInfo}
                image={featuredArtwork}
                isLoading={status.isLoading}
                socialLinks={socialLinks}
                collections={collections}
                collectionsStatus={collectionsStatus}
                isEmptyCollections={isEmptyCollections}
            />
        </HomeTemplate>
    );
}

export default ArtistHomePage;
