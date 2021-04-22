import React, { useEffect, useState } from 'react';
import _ from 'lodash';
// import { useSelector } from 'react-redux';
import ProfileTemplate from '../../templates/ProfileTemplate';
import ArtworkEditorHeader from './ArtworkEditorHeader';
import ArtworkEditForm from './ArtworkEditForm';
import ArtworkImages from './ArtworkImages';
import { FormWrapper, ImagesWrapper, DeleteLink, ContentHolder } from './styled';
import { deleteArtwork, saveArtwork, fetchArtwork, deleteImageRequest, resetEditorState } from './editArtworkSlice';
import artworkSelector from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingOverlay from 'components/LoadingOverlay';
import { MContentHolder } from 'styled';
import { bindActionCreators } from 'redux';

// import privateGallerySelector from '../selectors/privateGallerySelector';

interface IRouteParams {
    artworkId: string
}

const RenderEditor = ({ artwork, status, setUpdatedArtwork, deleteArtwork, deleteImageRequest }) => {
    if (!_.isEmpty(artwork) && !status.isLoading) {
        return (
            <ContentHolder>
                <FormWrapper>
                    <ArtworkEditForm artwork={artwork} onChange={setUpdatedArtwork} />
                    {/* <ArtworkNotes /> */}
                    <div>
                        <DeleteLink onClick={e => deleteArtwork({ artworkId: artwork.id })} id="artworkDeleteBtn">Delete Artwork</DeleteLink>
                    </div>
                </FormWrapper>
                <ImagesWrapper>
                    <ArtworkImages images={artwork.images} onDelete={(imageId) => deleteImageRequest({
                        artworkId: artwork.id,
                        imageId,
                    })} />
                </ImagesWrapper>
            </ContentHolder>
        );
    }

    return <LoadingOverlay label="Loading your artwork..." />;
}

const ArtworkEditorPage = (location) => {
    const [updatedArtwork, setUpdatedArtwork] = useState({});
    const dispatch = useDispatch();
    const { status, artwork } = useSelector(artworkSelector);
    const params = useParams<IRouteParams>();

    const actions = bindActionCreators({
        fetchArtwork,
        saveArtwork,
        deleteArtwork,
        deleteImageRequest,
        resetEditorState,
    }, dispatch);

    useEffect(() => {
        if ((_.isEmpty(artwork) && !status.isLoading) || artwork.id !== params.artworkId) {
            actions.fetchArtwork({ artworkId: params.artworkId });
        }

        return () => {
            if (!_.isEmpty(artwork)) {
                actions.resetEditorState();
            }
        }
    }, [dispatch]);

    return  (
        <ProfileTemplate
            location={location}>
                <MContentHolder>
                    <ArtworkEditorHeader
                        onSave={() => actions.saveArtwork({ updatedArtwork })}
                        onImagesUpload={() => console.log('onImagesUpload')}
                        commitStatus={{}}
                        artwork={artwork}
                    />
                    <RenderEditor
                        artwork={artwork}
                        status={status}
                        setUpdatedArtwork={setUpdatedArtwork}
                        deleteArtwork={actions.deleteArtwork}
                        deleteImageRequest={actions.deleteImageRequest} />
                </MContentHolder>
        </ProfileTemplate>
    );
}

export default ArtworkEditorPage;
