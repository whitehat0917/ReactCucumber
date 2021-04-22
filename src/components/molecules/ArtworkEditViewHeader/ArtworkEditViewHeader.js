import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import Button from 'atoms/Button';



const ArtworkEditViewHeader = ({ onSave, onImagesUpload, commitStatus }) => (
  <Container>
    <Typography type="h3">Edit Artwork</Typography>
    <ButtonsWrapper>
      <ButtonWrapper>
        <Button styleType="gray" onClick={onImagesUpload}>Upload Images</Button>
      </ButtonWrapper>
      <Button onClick={onSave} disabled={commitStatus.isLoading} id="saveArtworkBtn">
        { commitStatus.isLoading ? 'Saving...' : 'Save' }
      </Button>
    </ButtonsWrapper>
  </Container>
);

ArtworkEditViewHeader.propTypes = {
  onSave: PropTypes.func.isRequired,
  onImagesUpload: PropTypes.func.isRequired,
  commitStatus: PropTypes.object.isRequired,
};

export default ArtworkEditViewHeader;
