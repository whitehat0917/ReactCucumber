import Icon from 'components/Icon';
import Typography from 'components/Typography';
import { I18nText } from 'features/core/i18n/I18nText';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background: #000000;
  box-sizing: border-box;
  border-radius: 7px;
  align-items: center;
  cursor: pointer;
  height: 3rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  margin-left: 0.5rem;
  border-radius: 4px;
  box-sizing: border-box;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppleIcon = styled((props) => (
  <Icon size={1.6} clickable {...props}>
    apple
  </Icon>
))``;

const AppleLoginButton = ({ onClick }) => (
  <Container onClick={onClick}>
    <IconContainer>
      <AppleIcon />
    </IconContainer>
    <TextWrapper>
      <I18nText type="subtitle2" color="white" msgKey='sign.in.with.apple' />
      
    </TextWrapper>
  </Container>
);

export default AppleLoginButton;
