import React from 'react';
// import PropTypes from 'prop-types';
import Typography from 'components/Typography';
import Button from 'components/Button';

import {
    Container,
    ButtonsWrapper,
    ButtonWrapper,
} from './styled';
// import { MLink } from 'styled';
// import { UploadButtonHolder } from 'features/artistInfo/styled';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { setCurrArtwork } from '../uploader/uploaderSlice';

const ArtworkEditorHeader = ({ onSave, onImagesUpload, commitStatus, artwork }) => {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(setCurrArtwork(artwork));
        dispatch(push('/uploader'));
    };

    return (
        <Container>
            <Typography type="h3">Edit Artwork</Typography>
            <ButtonsWrapper>
            <ButtonWrapper>
                {/* <UploadButtonHolder>
                    <MLink to={`/uploader`} fontSize='16'>Upload images</MLink>
                </UploadButtonHolder> */}
                <Button styleType="gray" style={{ width: '14rem'}} onClick={handleClick}>Add Images to Artwork</Button>
            </ButtonWrapper>
            <Button onClick={onSave} disabled={commitStatus.isLoading} id="saveArtworkBtn">
                { commitStatus.isLoading ? 'Saving...' : 'Save' }
            </Button>
            </ButtonsWrapper>
        </Container>
    );
}

// ArtworkEditViewHeader.propTypes = {
//     onSave: PropTypes.func.isRequired,
//     onImagesUpload: PropTypes.func.isRequired,
//     commitStatus: PropTypes.object.isRequired,
// };

export default ArtworkEditorHeader;
