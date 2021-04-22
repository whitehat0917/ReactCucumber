import Button from 'components/Button';
import { I18nText } from 'features/core/i18n/I18nText';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProfileTemplate from '../../templates/ProfileTemplate';

const Page404Wrapper = styled.div`
  max-width: 1240px;
  margin: auto;
  display: flex;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
`;
const Container404 = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const NotFoundText = styled.h1`
  font-family: Open Sans, sans-serif;
  font-size: 15rem;
  color: ${({ theme }) => theme.palette.gray['20']};
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.palette.gray['100']};
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 6.5rem;
  font-weight: normal;
  font-style: normal;
  line-height: 7rem;
  letter-spacing: 0.01rem;
  margin: 0;
  text-align: left;
  white-space: normal;
  @media screen and (max-width: 1024px) {
    font-size: 4rem;
    width: 90%;
    align-self: center;
  }
`;
const SubTitle = styled.p`
  color: ${({ theme }) => theme.palette.gray['100']};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 3rem;
  text-align: left;
  font-style: normal;
  line-height: 3.6rem;
  margin: 0;
  margin-top: 1.5rem;
  white-space: normal;
  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
    line-height: 3rem;
    width: 90%;
    align-self: center;
  }
`;
const ButtonText = styled.p`
  color: white;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1rem;
`;
const ButtonContainer = styled.div`
  display: flex;

  margin-top: 3rem;
  button {
    min-width: 60%;
  }
  @media screen and (max-width: 1024px) {
    justify-content: center;
    button {
      width: 90%;
    }
  }
`;

const Page404 = (location) => {
  const history = useHistory();
  return (
    <ProfileTemplate isEmpty location={location}>
      <Page404Wrapper>
        <Container404>
          <NotFoundText>404</NotFoundText>
        </Container404>
        <MessageContainer>
          <I18nText msgKey="error.404.title" type="h1" component={Title} />
          <I18nText msgKey="error.404.description" type="body3" component={SubTitle} />
          <ButtonContainer>
            <Button onClick={() => history.push('/')}>
              <I18nText msgKey="Go to main page" component={ButtonText} />
            </Button>
          </ButtonContainer>
        </MessageContainer>
      </Page404Wrapper>
    </ProfileTemplate>
  );
};

export default Page404;
