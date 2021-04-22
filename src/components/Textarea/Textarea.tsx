import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputBase from '../InputBase';
import Typography from '../Typography';

const placeholderColorChooser = (state) => ({ disabled, theme }) => {
  if (disabled) return theme.palette.gray[50];
  switch (state) {
    case 'hover': return theme.palette.gray[50];
    case 'active':
    case 'default':
    default: return theme.palette.gray[30];
  }
};

const CustomTextarea = styled.textarea`
  ${InputBase.wrapper}
  ${InputBase.text}
  padding: 0.5rem 1rem;
  height: auto;
  ::placeholder {
    color: ${placeholderColorChooser('default')};
  }

  &:hover::placeholder {
    color: ${placeholderColorChooser('hover')};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

class Textarea extends React.PureComponent {
  constructor() {
    super();
    this.node = React.createRef();
  }

  componentDidMount() {
    if (this.node) {
      this.node.current.setAttribute('style', `height: ${this.node.current.scrollHeight}px;overflow-y:hidden;`);
      this.node.current.addEventListener('input', this.handleInput, false);
      if (this.props.autoFocus) {
        this.node.current.focus();
      }
    }
  }

  handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  render() {
    const {
      errorText, style, ...props
    } = this.props;
    return (
      <Wrapper style={style}>
        <CustomTextarea ref={this.node} {...props} />
        {
          errorText && (
            <Typography
              type="caption"
              color="error"
            >
              {errorText}
            </Typography>
          )
        }
      </Wrapper>
    );
  }
}

Textarea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default Textarea;
