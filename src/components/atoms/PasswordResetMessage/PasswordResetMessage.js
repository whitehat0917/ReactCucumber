import React from 'react';
import styled from 'styled-components';
import ContentWrapper from 'atoms/ContentWrapper';
import Typography from 'atoms/Typography';

const Wrapper = styled(ContentWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PasswordResetMessage = () => (
  <Wrapper fullHeight>
    <Typography type="h3">Check your email</Typography>
    <Typography>We&apos;ve sent you an email. Click the link in the email to reset your password. </Typography>
  </Wrapper>
);

export default PasswordResetMessage;
