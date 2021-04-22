import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Popover from 'components/Popover';
import Typography from '../Typography';
import Icon from '../Icon';

const backgroundChooser = (state) => ({
  styleType = 'contained', loading, disabled, theme,
}) => {
  if (styleType === 'outlined' || (disabled && styleType === 'gray')) {
    return 'transparent';
  }
  if (disabled && !loading) {
    return theme.palette.gray[30];
  }
  if (styleType === 'contained') {
    const defaultStyle = `linear-gradient(0.25turn, ${theme.palette.gradient.to}, ${theme.palette.gradient.from}, ${theme.palette.gradient.to})`;
    if (loading) return defaultStyle;
    switch (state) {
      case 'active': return theme.palette.primary[30];
      default: return defaultStyle;
    }
  }
  if (styleType === 'gray') {
    const defaultStyle = theme.palette.gray[20];
    if (loading) return defaultStyle;
    switch (state) {
      case 'active': return theme.palette.gray[27];
      case 'hover': return theme.palette.gray[26];
      default: return defaultStyle;
    }
  }
  return 'inherit';
};

const borderChooser = (state) => ({
  styleType, disabled, loading, theme,
}) => {
  if (['contained', 'gray'].includes(styleType)) {
    return 'none';
  }
  if (disabled && !loading) {
    return `1px solid ${theme.palette.gray[30]}`;
  }
  if (styleType === 'outlined') {
    const defaultStyle = `1px solid ${theme.palette.gray[50]}`;
    if (loading) return defaultStyle;
    switch (state) {
      case 'hover': return `1px solid ${theme.palette.gray[100]}`;
      case 'active': return `1px solid ${theme.palette.primary[30]}`;
      default: return defaultStyle;
    }
  }
  return 'inherit';
};

const heightChooser = ({ size, height }) => {
  if (height) {
    return `${height}rem`;
  }
  switch (size.toLowerCase()) {
    case 'big': return '4.5rem';
    case 'dense': return '2rem';
    case 'small':
    case 'normal':
    default: return '3rem';
  }
};

const widthChooser = ({ fullWidth, size, width }) => {
  if (fullWidth) return '100%';
  if (width) {
    return `${width}rem`;
  }
  switch (size.toLowerCase()) {
    case 'big': return '16.25rem';
    case 'small': return '6.75rem';
    case 'dense': return '6.75rem';
    case 'normal':
    default: return '9.75rem';
  }
};

const textColorChooser = (state) => ({
  styleType, disabled, loading, theme,
}) => {
  if (styleType === 'contained') {
    return theme.palette.white;
  }
  if (disabled && !loading) {
    return theme.palette.gray[30];
  }
  if (styleType === 'outlined') {
    const defaultStyle = theme.palette.gray[100];
    if (loading) return defaultStyle;
    switch (state) {
      case 'hover': return defaultStyle;
      case 'active': return theme.palette.primary[30];
      default: return defaultStyle;
    }
  }
  if (styleType === 'gray') {
    return theme.palette.gray[100];
  }
  return 'inherit';
};

const boxShadowChooser = ({ styleType }) => {
  if (['outlined', 'gray'].includes(styleType)) {
    return '0px 0px 10px rgba(249, 110, 48, 0.3)';
  }
  return '0px 0px 10px rgba(249, 110, 48, 0.5)';
};

const backgroundPositionChooser = ({ fullWidth, styleType, size }) => {
  if (styleType === 'outlined') return 'unset';
  if (fullWidth) return '100%';
  switch (size.toLowerCase()) {
    case 'big': return '16.25rem';
    case 'normal':
    default: return '9.75rem';
  }
};

const backgroundSizeChooser = (props) => `calc(${backgroundPositionChooser(props)} * 2)`;

const fontSizeChooser = ({ size }) => {
  switch (size.toLowerCase()) {
    case 'dense': return '0.875rem';
    case 'normal':
    default: return '1rem';
  }
};

const lineHeightChooser = ({ size }) => {
  switch (size.toLowerCase()) {
    case 'dense': return '1.25rem';
    case 'normal':
    default: return '1.4375rem';
  }
};

const fontWeightChooser = ({ size, fontWeight }) => {
  if (fontWeight) return fontWeight;
  switch (size.toLowerCase()) {
    case 'dense': return '600';
    default: return 'bold';
  }
};

const StyledButton = styled.button`
  outline: 0;
  width: ${widthChooser};
  height: ${heightChooser};
  padding: 0;
  background: ${backgroundChooser()};
  border: ${borderChooser()};
  border-radius: 0.4375rem;
  box-sizing: ${({ styleType }) => (styleType === 'outlined' ? 'border-box' : 'unset')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: ${fontWeightChooser};
  line-height: ${lineHeightChooser};
  font-size: ${fontSizeChooser};
  text-align: center;
  letter-spacing: 0.01rem;
  color: ${textColorChooser()};
  transition: background 0.2s ease-in-out;
  background-size: ${backgroundSizeChooser};

  &:hover {
    ${({ styleType, loading, ...props }) => ((styleType === 'contained' && !loading) ? `background-position: ${backgroundPositionChooser({ styleType, ...props })};` : '')}
    ${({ styleType, ...props }) => (styleType === 'gray' ? `background: ${backgroundChooser('hover')({ styleType, ...props })};` : '')}
    
    border: ${borderChooser('hover')};
    color: ${textColorChooser('hover')};
  }

  &:active {
    ${({ loading, ...props }) => (loading ? '' : `
      background: ${backgroundChooser('active')(props)};
      border: ${borderChooser('active')(props)};
      color: ${textColorChooser('active')(props)};
      box-shadow: ${boxShadowChooser(props)};
      color: ${textColorChooser('default')(props)};
    `)}
    transition: none;
  }
`;

const Loading = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Bounce = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 50%;
  margin: 0.2rem;

  animation: ${Loading} 1.4s infinite ease-in-out both;
`;

const OptionsWrapper = styled.div`
  padding: 1rem;
`;

const OptionWrapper = styled.div`
  cursor: pointer;
  padding: 0.2rem 0;
`;

const DropdownButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkOption = styled.a`
  text-decoration: none;
`;

class Button extends PureComponent {
  state = {
    dropdownOpened: false,
  }

  handleDropdownButtonClick = (e) => {
    const { onClick } = this.props;
    this.setState({ dropdownOpened: true });
    if (onClick) {
      onClick(e);
    }
  }

  handlePopoverClose = () => {
    this.setState({ dropdownOpened: false });
  }

  render() {
    const { dropdownOpened } = this.state;
    const {
      loading, children, style, dropdown, ...props
    } = this.props;
    if (loading) {
      return (
        <StyledButton
          {...props}
          loading={loading}
          disabled
          style={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bounce style={{ animationDelay: '-0.64s' }} />
          <Bounce style={{ animationDelay: '-0.32s' }} />
          <Bounce style={{ animationDelay: '-0.16s' }} />
          <Bounce />
        </StyledButton>
      );
    }

    if (dropdown && dropdown.options) {
      return (
        <Popover
          width={dropdown.width}
          maxHeight={12.5}
          offset="-0px"
          placement="bottom-start"
          ReferenceElement={() => (
            <DropdownButton style={style} {...props} onClick={this.handleDropdownButtonClick}>
              {children}
              <Icon
                clickable
                style={{ marginLeft: this.props.size === 'dense' ? '1rem' : '2.125rem' }}
                color="white"
                size={this.props.size === 'dense' ? 1 : 1.125}
              >
                {dropdownOpened ? 'dropdown_arrow_up' : 'dropdown_arrow_down'}
              </Icon>
            </DropdownButton>
          )}
          onClose={this.handlePopoverClose}
          onClick={this.handlePopoverClose}
        >
          <OptionsWrapper>
            {
              dropdown.options.map((option) => (
                <OptionWrapper key={option.label}>
                  {
                    option.url && (
                      <LinkOption
                        key={option.label}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={option.onClick}
                      >
                        <Typography>{option.label}</Typography>
                      </LinkOption>
                    )
                  }
                  {
                    !option.url && option.onClick && (
                      <Typography onClick={option.onClick}>{option.label}</Typography>
                    )
                  }
                </OptionWrapper>
              ))
            }
          </OptionsWrapper>
        </Popover>
      );
    }

    return (<StyledButton style={style} {...props}>{children}</StyledButton>);
  }
}

Button.defaultProps = {
  styleType: 'contained',
  size: 'normal',
};

// Button.propTypes = {
//   styleType: PropTypes.oneOf([
//     'contained',
//     'gray',
//     'outlined',
//   ]),
//   size: PropTypes.oneOf([
//     'big',
//     'normal',
//     'small',
//     'dense',
//   ]),
//   disabled: PropTypes.bool,
//   fullWidth: PropTypes.bool,
//   loading: PropTypes.bool,
//   dropdown: PropTypes.object,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   fontWeight: PropTypes.oneOf([300, 400, 500, 600]),
// };

export default ({ children, ...props }) => (
  <Button {...props}>
    {children}
  </Button>
);
