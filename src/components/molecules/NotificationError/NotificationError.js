import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'atoms/Typography';
import styled from 'styled-components';
import NotificationContainer from 'atoms/NotificationContainer';

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled((props) => <Typography color="white" {...props} />)`
  margin-right: 0.5rem;
`;

const RetryLink = styled((props) => <Typography color="white" weight="600" {...props} />)`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const NotificationError = ({ onClick, text, withRetry = true }) => (
  <NotificationContainer type="error">
    <TextWrapper>
      <Text>{text}</Text>
      {withRetry && <RetryLink onClick={onClick}>Try again.</RetryLink>}
      <span style={{ fontSize: '1.5rem' }} role="img" aria-label="sad_face">🙁</span>
    </TextWrapper>
  </NotificationContainer>
);

NotificationError.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  withRetry: PropTypes.bool,
};


export default NotificationError;
