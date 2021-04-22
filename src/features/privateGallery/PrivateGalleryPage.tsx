import React, { Fragment, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import ProfileTemplate from '../../templates/ProfileTemplate';
import PrivateGallery from './PrivateGallery';

import privateGallerySelector from './selectors';
import { privateArtworksFetchRequest } from './privateGallerySlice';
import LoadingOverlay from 'components/LoadingOverlay';
import useScrollToTop from 'features/core/hooks/useScrollToTop';

const RenderGallery = ({ artworks, artworksUpdateId, isPrivate, status, deleteStatus, total }) => {
    if (deleteStatus.isLoading) {
        return <LoadingOverlay transparent />
    }

    return (
        <PrivateGallery
            artworks={artworks}
            artworksUpdateId={artworksUpdateId}
            isPrivate={isPrivate}
            status={status}
            total={total}
        />
    );
}

const PrivateGalleryPage = (location) => {
    const dispatch = useDispatch();
    const {
        deleteStatus,
        status,
        artworks,
        artworksUpdateId,
        isPrivate,
        hasMore,
        totalArtworks
    } = useSelector(privateGallerySelector('fetch'));

    useEffect(() => {
        if (!artworks.length && !status.isLoading && _.isEmpty(status.errors)) {
            dispatch(privateArtworksFetchRequest({}));
        }
    }, [dispatch, artworks, status]);

    const handleLoadMore = () => {
        if (hasMore && !status.isLoading && _.isEmpty(status.errors)) {
            dispatch(privateArtworksFetchRequest({
                trigger: 'update',
                offset: artworks.length
            }));
        }
    };

    useScrollToTop();

    return  (
        <ProfileTemplate
            location={location}
            onLoadMore={handleLoadMore}
        >
            <Fragment>
                {/* <PrivateGalleryHeader /> */}
                {/* <ArtworkFilter /> */}
                <RenderGallery
                    artworks={artworks}
                    artworksUpdateId={artworksUpdateId}
                    isPrivate={isPrivate}
                    status={status}
                    deleteStatus={deleteStatus}
                    total={totalArtworks}
                />
            </Fragment>
        </ProfileTemplate>
    );
}

export default PrivateGalleryPage;
