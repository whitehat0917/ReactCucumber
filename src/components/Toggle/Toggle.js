import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 3.25rem;
  height: 1.75rem;
`;

const TextStyle = css`
  font-size: 0.6875rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
`;

const CircleContent = css`
  content: ${({ checked, leftLabel, rightLabel }) => {
    if (leftLabel && rightLabel) {
      return checked ? `"${rightLabel}"` : `"${leftLabel}"`;
    }
    return '""';
  }};
  ${TextStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.primary[30]};
`;

const Circle = css`
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
  transform: ${({ checked }) => (checked ? 'translateX(1.5rem)' : 'none')};

  ${CircleContent}
`;

const SliderContent = css`
  content: ${({ checked, leftLabel, rightLabel }) => {
    if (leftLabel && rightLabel) {
      return checked ? `"${leftLabel}"` : `"${rightLabel}"`;
    }
    return '""';
  }};
  ${TextStyle};
  color: ${({ theme }) => theme.palette.white};
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? 'flex-start' : 'flex-end')};
  height: 100%;
  padding: 0 0.4rem;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6.25rem;
  background-color: ${({ theme, checked }) => (checked ? theme.palette.primary[30] : theme.palette.gray[30])};
  transition: .4s;

  &:before {
    ${Circle}
  }

  &:after {
    ${SliderContent}
  }
`;

const Toggle = ({
  checked, onChange, leftLabel, rightLabel,
}) => (
  <Switch>
    <Input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <Slider
      checked={checked}
      leftLabel={leftLabel}
      rightLabel={rightLabel}
    />
  </Switch>
);

Toggle.defaultProps = {
  checked: false,
};

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
};

export default Toggle;
