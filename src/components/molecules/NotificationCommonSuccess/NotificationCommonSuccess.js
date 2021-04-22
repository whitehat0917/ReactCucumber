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

const NotificationCommonSuccess = ({ text, ...rest }) => (
  <NotificationContainer type="success" {...rest}>
    <TextWrapper>
      <Text>{ text }</Text>
      <span style={{ fontSize: '1.5rem' }} role="img" aria-label="thumb_up">👍</span>
    </TextWrapper>
  </NotificationContainer>
);

NotificationCommonSuccess.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NotificationCommonSuccess;
