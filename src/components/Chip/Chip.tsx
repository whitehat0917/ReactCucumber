import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';

const ChipWrapper = styled.div`
  border-radius: 7px;
  background-color: ${({ theme }) => theme.palette.gray[20]};
  display: inline-flex;
  align-items: center;
  height: ${({ size }) => (size === 'big' ? '2.125rem' : '1.25rem')};
  padding: 0 0.5rem;
  margin: 0.125rem;
`;

const Chip = ({ size, label, onDelete }) => (
  <ChipWrapper size={size}>
    <Typography
      type={size === 'big' ? 'body' : 'caption'}
      style={{ marginRight: '0.5rem' }}
    >
      {label}
    </Typography>
    {
      onDelete
      && (
      <Icon
        size={size === 'big' ? 0.625 : 0.4375}
        clickable
        onClick={onDelete}
      >
        close
      </Icon>
      )
    }
  </ChipWrapper>
);

Chip.defaultProps = {
  size: 'default',
};

Chip.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf([
    'big',
    'default',
  ]),
  onDelete: PropTypes.func,
};

export default Chip;
