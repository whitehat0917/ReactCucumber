import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const colorChooser = ({ color, theme }) => {
  if (!color) return theme.palette.gray[100];
  switch (color.toLowerCase()) {
    case 'primary': return theme.palette.primary[30];
    case 'default': return theme.palette.gray[100];
    default: {
      return color;
    }
  }
};

const hoverColorChooser = ({ color, theme }) => {
  if (!color) return theme.palette.gray[100];
  switch (color.toLowerCase()) {
    case 'primary': return theme.palette.primary[100];
    case 'default': return theme.palette.gray[80];
    default: {
      return color;
    }
  }
};

const fontFamilyChooser = ({ fontFamily, size, theme }) => {
  if (size === 'big') return theme.fonts.primaryHeavy;
  if (fontFamily === 'secondary') return theme.fonts.secondary;
  return theme.fonts.primary;
};

const sizeChooser = ({ size }) => {
  switch (size) {
    case 'small': return '0.6875rem';
    case 'normal': return '1rem';
    case 'big': return '2.25rem';
    default: {
      return `${size}rem`;
    }
  }
};

const style = css`
  text-decoration: none;
  font-family: ${fontFamilyChooser};
  font-size: ${sizeChooser};
  line-height: ${({ size }) => (size === 'small' ? '1.375rem' : '1.75rem')};
  color: ${colorChooser};
  &:hover {
    color: ${hoverColorChooser};
  }
`;

const Anchor = styled.a`${style}`;

const Nav = styled(NavLink)`${style}`;

const Pseudo = styled.span`
  ${style}
  cursor: pointer;
`;

const Link = ({
  children, type, to, onClick, isActive, ...props
}) => {
  if (type === 'anchor') {
    return (<Anchor {...props} href={to}>{children}</Anchor>);
  }
  if (type === 'pseudo') {
    return (<Pseudo onClick={onClick} {...props}>{children}</Pseudo>);
  }
  return (<Nav to={to} {...props}>{children}</Nav>);
};

Link.defaultProps = {
  type: 'nav',
  size: 'small',
  color: 'primary',
  fontFamily: 'default',
};

Link.propTypes = {
  fontFamily: PropTypes.oneOf([
    'default',
    'secondary',
  ]),
  type: PropTypes.oneOf([
    'nav',
    'anchor',
    'pseudo',
  ]),
  to: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'default']),
};

export default Link;
