import React from 'react';
import styled from 'styled-components';
import Separator from '../FormSeparator';

const StyledSeparator = styled(Separator)`
  width: 20.375rem;
  margin-bottom: 1rem;
`;

const LoginSeparator = () => (
  <StyledSeparator text="Email login" />
);

export default LoginSeparator;
