import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Icon from 'atoms/Icon';
import Typography from 'atoms/Typography';
import Popover from 'molecules/Popover';

const IconWrapper = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ notesOpened, theme }) => (notesOpened ? theme.palette.gray[20] : 'inherit')};
`;

const NoteWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[20]};
  padding: 1.125rem 1rem 0.875rem 1rem;

  :last-child {
    border-bottom: unset;
  }
`;

const Note = ({ body, created }) => (
  <NoteWrapper>
    <Typography type="small" style={{ marginBottom: '0.7rem' }}>{body || ''}</Typography>
    <Typography type="caption" color="muted">
      <Moment format="LL">{created || ''}</Moment>
    </Typography>
  </NoteWrapper>
);
Note.propTypes = {
  body: PropTypes.string,
  created: PropTypes.string,
};

class NotesRenderer extends Component {
  state = { notesOpened: false }

  handleOnOpen = () => {
    this.setState({ notesOpened: true });
  }

  handleOnClose = () => {
    this.setState({ notesOpened: false });
  }

  render() {
    const { value } = this.props;
    const { notesOpened } = this.state;

    const hasNotes = Array.isArray(value) && value.length > 0;

    if (!hasNotes) {
      return (
        <IconWrapper>
          <Icon color="primary" size={1.25}>note_add</Icon>
        </IconWrapper>
      );
    }

    return (
      <Popover
        width={20.5}
        maxHeight={23}
        placement="bottom-end"
        ReferenceElement={(props) => (
          <IconWrapper notesOpened={notesOpened}>
            <Icon clickable color={notesOpened ? 'white' : 'primary'} size={1.25} {...props}>note</Icon>
          </IconWrapper>
        )}
        onOpen={this.handleOnOpen}
        onClose={this.handleOnClose}
      >
        {value.map((note) => <Note key={note.id} {...note} />)}
      </Popover>
    );
  }
}

NotesRenderer.propTypes = {
  value: PropTypes.array,
};

export default NotesRenderer;
