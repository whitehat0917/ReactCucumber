import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'components/Icon';
import Typography from 'components/Typography';

const Container = styled.div`
  display: flex;
  background: linear-gradient(0deg, #4285F4, #4285F4), #FFFFFF;
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
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF;
  border-radius: 4px;
  box-sizing: border-box;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleIcon = styled((props) => <Icon size={1.25} clickable {...props}>google</Icon>)`
`;

const GoogleLoginButton = ({ onClick }) => (
  <Container onClick={onClick}>
    <IconContainer>
      <GoogleIcon />
    </IconContainer>
    <TextWrapper>
      <Typography type="subtitle2" color="white">Sign in with Google</Typography>
    </TextWrapper>
  </Container>
);

GoogleLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoogleLoginButton;
