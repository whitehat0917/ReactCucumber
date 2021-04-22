/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArtworkNote from 'molecules/ArtworkNote';
import Typography from 'atoms/Typography';
import Link from 'atoms/Link';
import ConfirmationModal from 'molecules/ConfirmationModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const NoteWrapper = styled.div`
  margin: 0.5rem 0;
  border-bottom: ${({ withBorder, theme }) => (withBorder ? `1px solid ${theme.palette.gray[50]}` : 'none')};
`;

const Title = styled((props) => <Typography type="small" weight="600" {...props} />)`
  margin-bottom: 0.5rem;
`;


class ArtworkNotes extends React.PureComponent {
  render() {
    const {
      notes, editingNoteId, onEditCancel, onNoteSubmit, onNoteClick, onAddNewNoteClick, onDelete,
      onDeleteRequest, onDeleteModalClose,
    } = this.props;
    return (
      <Container>
        <ConfirmationModal
          name="delete_note_confirm"
          title="Delete note"
          text="Are you sure you want to delete this note?"
          confirmText="Delete"
          onCancel={onDeleteModalClose}
          onSubmit={onDelete}
        />
        <Title>Notes</Title>
        <Link type="pseudo" onClick={onAddNewNoteClick}>+ Add note</Link>
        {
          notes.map((note, idx) => (
            <NoteWrapper key={note.id} withBorder={idx < notes.length - 1}>
              <ArtworkNote
                text={note.body}
                date={note.updated}
                editing={editingNoteId && editingNoteId === note.id}
                onSubmit={onNoteSubmit}
                onCancel={onEditCancel}
                onClick={onNoteClick(note.id)}
                onDelete={onDeleteRequest(note.id)}
              />
            </NoteWrapper>
          ))
        }
      </Container>
    );
  }
}

ArtworkNotes.propTypes = {
  notes: PropTypes.array.isRequired,
  onAddNewNoteClick: PropTypes.func.isRequired,
  editingNoteId: PropTypes.string,
  onEditCancel: PropTypes.func.isRequired,
  onNoteSubmit: PropTypes.func.isRequired,
  onNoteClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteModalClose: PropTypes.func.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
};

export default ArtworkNotes;
