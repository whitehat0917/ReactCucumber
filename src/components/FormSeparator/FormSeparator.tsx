import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '../Typography';

const SeparatorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Hr = styled.div`
  background: ${({ theme }) => theme.palette.gray[30]};
  width: 100%;
  height: 1px;
`;

const SeparatorLabel = styled((props) => <Typography color="#9c9d9e" noWrap {...props} />)`
  padding: 0 1rem;
`;

const Separator = ({ text, className }) => (
  <SeparatorWrapper className={className}>
    <Hr />
    <SeparatorLabel>{ text }</SeparatorLabel>
    <Hr />
  </SeparatorWrapper>
);

Separator.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Separator;
