import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'components/Icon';
import Typography from 'components/Typography';

const Container = styled.div`
  display: flex;
  background: #4267b2;
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
  margin-left: 3px;
  border-radius: 4px;
  box-sizing: border-box;
  height: 3.125rem;
  width: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FacebookIcon = styled((props) => <Icon size={2} clickable {...props}>facebook</Icon>)`
  padding: 0.5rem;
  height: 2.8rem;
  width: 3rem;
`;

const FacebookLoginButton = ({ onClick }) => (
  <Container onClick={onClick}>
    <FacebookIcon />
    <TextWrapper>
      <Typography type="subtitle2" color="white">Sign in with Facebook</Typography>
    </TextWrapper>
  </Container>
);

FacebookLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FacebookLoginButton;
