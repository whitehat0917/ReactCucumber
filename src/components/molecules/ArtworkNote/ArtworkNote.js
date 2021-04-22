import React from 'react';
import PropTypes from 'prop-types';
import theme from 'components/themes/default';
import Typography from 'atoms/Typography';
import styled from 'styled-components';
import Moment from 'react-moment';
import Textarea from 'atoms/Textarea';
import ClickAwayListener from 'atoms/ClickAwayListener';
import Icon from 'atoms/Icon';

const Container = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  display: flex;
  padding-top: 0.25rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  max-width: calc(100% - 0.5rem);
  padding-right: 1.25rem;
  box-sizing: border-box;
  cursor: pointer;
`;

const DateWrapper = styled.div`
  margin: 0.5rem 0;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
`;

const NoteEditArea = styled(Textarea)`
  margin-bottom: 0.5rem;
`;

class ArtworkNote extends React.PureComponent {
  state = {
    editedText: null,
  }

  handleChange = (e) => {
    this.setState({ editedText: e.target.value });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.editedText);
    this.setState({ editedText: null });
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.onCancel();
      this.setState({ editedText: null });
    }
  }

  render() {
    const {
      editing, text, date, onClick, onDelete,
    } = this.props;
    if (editing) {
      return (
        <ClickAwayListener onClickAway={this.handleSubmit}>
          <NoteEditArea autoFocus defaultValue={text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
        </ClickAwayListener>
      );
    }

    return (
      <Container>
        <Wrapper onClick={onClick}>
          <ContentWrapper>
            <TextWrapper>
              <Typography color={theme.palette.gray[80]}>
                { text }
              </Typography>
            </TextWrapper>
          </ContentWrapper>
          <DateWrapper>
            <Typography type="caption" color={theme.palette.gray[50]}>
              <Moment format="LL">
                { date }
              </Moment>
            </Typography>
          </DateWrapper>
        </Wrapper>
        <IconWrapper onClick={onDelete}>
          <Icon size={0.5} clickable>close</Icon>
        </IconWrapper>
      </Container>
    );
  }
}

ArtworkNote.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  editing: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ArtworkNote;
