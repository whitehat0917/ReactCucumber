import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtworkNotes from 'organisms/ArtworkNotes';
import { fromArtworks } from 'store/selectors';
import { artworksEditSelected, modalClose, modalOpen } from 'store/actions';

const generateId = () => `id-${Math.random()}`;

class ArtworkNotesContainer extends React.PureComponent {
  state = {
    editingNoteId: null,
    isDummy: false,
    noteToDelete: null,
  }

  handleAddNewNote = () => {
    const { artwork: { notes }, editArtwork } = this.props;
    const id = generateId();
    const dummyNote = {
      id,
    };
    editArtwork({ notes: [...notes, dummyNote] });
    this.setState({
      editingNoteId: id,
      isDummy: true,
    });
  }

  handleEditCancel = () => {
    const { artwork: { notes }, editArtwork } = this.props;
    const { isDummy, editingNoteId } = this.state;
    if (isDummy) {
      editArtwork({ notes: notes.filter((note) => note.id !== editingNoteId) });
    }
    this.setState({ editingNoteId: null, isDummy: false });
  }

  handleSubmit = (body) => {
    const { editingNoteId } = this.state;
    const { artwork: { notes }, editArtwork } = this.props;
    if (body) {
      const updatedNotes = notes.map((note) => {
        if (note.id !== editingNoteId) {
          return note;
        }
        return {
          ...note,
          body,
        };
      });
      editArtwork({ notes: updatedNotes });
      this.setState({ editingNoteId: null, isDummy: false });
    } else {
      this.handleEditCancel();
    }
  }

  handleNoteClick = (noteId) => () => {
    this.setState({ editingNoteId: noteId, isDummy: false });
  }

  handleDelete = () => {
    const { artwork: { notes }, editArtwork, closeDeleteModal } = this.props;
    const { noteToDelete } = this.state;
    editArtwork({ notes: notes.filter((note) => note.id !== noteToDelete) });
    this.setState({ editingNoteId: null, isDummy: false, noteToDelete: null });
    closeDeleteModal();
  }

  handleDeleteRequest = (noteId) => () => {
    const { openDeleteModal } = this.props;
    this.setState({ noteToDelete: noteId }, openDeleteModal);
  }

  handleDeleteModalClose = () => {
    const { closeDeleteModal } = this.props;
    this.setState({ noteToDelete: null }, closeDeleteModal);
  }

  render() {
    const { artwork: { notes } } = this.props;
    const { editingNoteId } = this.state;
    return (
      <ArtworkNotes
        notes={notes}
        onAddNewNoteClick={this.handleAddNewNote}
        editingNoteId={editingNoteId}
        onEditCancel={this.handleEditCancel}
        onNoteSubmit={this.handleSubmit}
        onNoteClick={this.handleNoteClick}
        onDelete={this.handleDelete}
        onDeleteModalClose={this.handleDeleteModalClose}
        onDeleteRequest={this.handleDeleteRequest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  artwork: fromArtworks.getSelected(state),
});

const mapDispatchToProps = (dispatch) => ({
  editArtwork: (data) => dispatch(artworksEditSelected(data)),
  openDeleteModal: () => dispatch(modalOpen('delete_note_confirm')),
  closeDeleteModal: () => dispatch(modalClose('delete_note_confirm')),
});

ArtworkNotesContainer.propTypes = {
  artwork: PropTypes.object.isRequired,
  editArtwork: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkNotesContainer);
