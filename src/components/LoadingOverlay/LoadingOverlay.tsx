import PropTypes from 'prop-types';
import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Icon from '../Icon';
import Typography from '../Typography';

const LoadingOverlayWrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: ${({ fixed }) => (fixed ? 'fixed' : 'absolute')};
  right: 0;
  top: 0;
  z-index: ${({ zIndex }) => zIndex || 1}
  background-color: ${({ transparent, semiTransparent, theme }) =>
    semiTransparent ? 'rgba(255,255,255,0.8)' : transparent ? 'transparent' : theme.palette.gray[10]};
`;

const FixedStyle = createGlobalStyle`
  body {
    overflow: hidden;
    padding-right: 17px;
  }
`;

const Rotateplane = keyframes`
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  50% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
  75% {
    transform: perspective(120px) rotateX(0deg) rotateY(-179.9deg);
  }
  100% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
`;

const Spinner = styled.div`
  animation: ${Rotateplane} 2.4s infinite ease-in-out;
`;

const LabelWrapper = styled.div`
  max-width: 20rem;
  margin-top: 1rem;
`;

const LoadingOverlay = ({ label, transparent, semiTransparent, fixed, zIndex }) => (
  <LoadingOverlayWrapper
    zIndex={zIndex}
    transparent={transparent}
    semiTransparent={semiTransparent}
    fixed={fixed}
    id="loadingOverlay"
  >
    {fixed && <FixedStyle />}
    <Spinner>
      <Icon size="big">marcel_v2_icon</Icon>
    </Spinner>
    <LabelWrapper>
      <Typography centered type="subtitle2">
        {label}
      </Typography>
    </LabelWrapper>
  </LoadingOverlayWrapper>
);

LoadingOverlay.propTypes = {
  label: PropTypes.string,
  transparent: PropTypes.bool,
  fixed: PropTypes.bool,
  semiTransparent: PropTypes.bool,
  zIndex: PropTypes.number,
};

LoadingOverlay.defaultProps = {
  transparent: true,
  fixed: false,
};

export default LoadingOverlay;
