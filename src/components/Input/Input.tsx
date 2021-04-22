import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import InputBase from '../InputBase';
import Typography from '../Typography';

const placeholderColorChooser = (state) => ({ disabled, theme }) => {
  if (disabled) return theme.palette.gray[50];
  switch (state) {
    case 'hover':
      return theme.palette.gray[50];
    case 'active':
    case 'default':
    default:
      return theme.palette.gray[30];
  }
};

const CustomInput = styled.input`
  ${InputBase.wrapper}
  ${InputBase.text}

  /* stylelint-disable-next-line selector-type-no-unknown */
  ${({ isPassword }) => (isPassword ? 'padding-right: 3.75rem;' : '')}

  ::placeholder {
    color: ${placeholderColorChooser('default')};
  }

  &:hover::placeholder {
    color: ${placeholderColorChooser('hover')};
  }
`;

const FlexWrapper = styled.div`
  position: relative;
  display: flex;
  width: inherit;
  align-items: center;
`;

const HideIcon = styled((props) => (
  <Icon clickable size="small" {...props}>
    eye
  </Icon>
))`
  position: absolute;
  right: 1.25rem;
`;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: props.type,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { value, error, errorText } = this.props;
    return (
      !isEqual(error, nextProps.error) ||
      !isEqual(errorText, nextProps.errorText) ||
      !isEqual(value, nextProps.value) ||
      !isEqual(this.state, nextState)
    );
  }

  handleEyeClick = () => {
    const { inputType } = this.state;
    this.setState({ inputType: inputType === 'password' ? 'text' : 'password' });
  };

  render() {
    const { inputType } = this.state;
    const { type, style, errorText, errorStyle, ...props } = this.props;

    let inputToRender = <CustomInput type={type} {...props} ref={this.props.inputRef} />;

    if (type === 'password') {
      inputToRender = (
        <FlexWrapper>
          <CustomInput {...props} isPassword type={inputType} />
          <HideIcon color={inputType === 'password' ? 'muted' : 'default'} onClick={this.handleEyeClick} />
        </FlexWrapper>
      );
    }
    return (
      <div style={{ position: 'relative', ...style }}>
        {inputToRender}
        {errorText && (
          <Typography style={{ position: 'absolute', top: '3.125rem', ...errorStyle }} type="caption" color="error">
            {errorText}
          </Typography>
        )}
      </div>
    );
  }
}

Input.defaultProps = {
  type: 'text',
  errorStyle: {},
};

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.string,
  errorStyle: PropTypes.object,
};

export default React.forwardRef((props, ref) => <Input {...props} inputRef={ref} />);
