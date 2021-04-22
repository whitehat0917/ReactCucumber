import React from 'react';
import Typography from 'atoms/Typography';
import styled from 'styled-components';
import NotificationContainer from 'atoms/NotificationContainer';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled((props) => <Typography type="h4" color="white" {...props} />)`
  margin-right: 0.5rem;
`;

const Body = (props) => <Typography type="small" color="white" {...props} />;

const NotificationUploadSuccess = () => (
  <NotificationContainer type="success">
    <TextWrapper>
      <TitleWrapper>
        <Title>Nice Work!</Title>
        <span style={{ fontSize: '1.5rem' }} role="img" aria-label="party_popper">🎉</span>
      </TitleWrapper>
      <Body>Your artworks will appear in the Marcel app also</Body>
    </TextWrapper>
  </NotificationContainer>
);

export default NotificationUploadSuccess;
