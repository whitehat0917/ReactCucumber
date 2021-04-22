import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentWrapper from 'atoms/ContentWrapper';
import Typography from 'atoms/Typography';
import DefaultLink from 'atoms/Link';

const Wrapper = styled(ContentWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Link = styled((props) => <DefaultLink type="pseudo" {...props} />)`
  font-size: 1rem;
  line-height: 1.6875rem;
`;

const PasswordResetInvalidParametersMessage = ({ onBackToResetClick }) => (
  <Wrapper fullHeight>
    <Typography type="h3">Reset password</Typography>
    <Typography>
      Something went wrong.
      <Link type="pseudo" onClick={onBackToResetClick}> Click here </Link>
      to reset password again.
    </Typography>
  </Wrapper>
);

PasswordResetInvalidParametersMessage.propTypes = {
  onBackToResetClick: PropTypes.func.isRequired,
};

export default PasswordResetInvalidParametersMessage;
