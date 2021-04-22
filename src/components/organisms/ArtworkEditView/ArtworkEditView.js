import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArtworkEditForm from 'containers/ArtworkEditForm';
import ArtworkNotes from 'containers/ArtworkNotes';
import ArtworkImages from 'containers/ArtworkImages';
import ArtworkEditViewHeader from 'containers/ArtworkEditViewHeader';
import Typography from 'atoms/Typography';
import theme from 'components/themes/default';
import ConfirmationModal from 'molecules/ConfirmationModal';

const Container = styled.div`
  display: flex;
  margin-bottom: 5rem;
`;

const FormWrapper = styled.div`
  flex: 1 1 33%;
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const ImagesWrapper = styled.div`
  flex: 1 1 66%;
  min-width: 25rem;
`;

const DeleteLink = styled((props) => <Typography type="subtitle2" color={theme.palette.red} {...props} />)`
  margin-top: 3rem;
  cursor: pointer;
  display: inline-block;
`;

const ArtworkEditView = ({
  onDelete, onDeleteRequest, onDeleteModalClose, deleteStatus,
}) => (
  <Fragment>
    <ConfirmationModal
      name="delete_artwork_confirm"
      title="Delete artwork"
      text="Are you sure you want to delete this artwork?"
      confirmText="Delete"
      onCancel={onDeleteModalClose}
      onSubmit={onDelete}
      isLoading={deleteStatus.isLoading}
      data={{
        type: 'artworkDeleteConfirmationModal',
      }}
    />
    <ArtworkEditViewHeader />
    <Container>
      <FormWrapper id="artworkEditForm">
        <ArtworkEditForm />
        <ArtworkNotes />
        <div>
          <DeleteLink onClick={onDeleteRequest} id="artworkDeleteBtn">Delete Artwork</DeleteLink>
        </div>
      </FormWrapper>
      <ImagesWrapper>
        <ArtworkImages />
      </ImagesWrapper>
    </Container>
  </Fragment>
); 

ArtworkEditView.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onDeleteModalClose: PropTypes.func.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
  deleteStatus: PropTypes.object.isRequired,
};

export default ArtworkEditView;
