import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'components/Slide';
import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    padding-right: 17px;
  }
`;

const getPositionSpecificStyles = (position) => {
  switch (position) {
    case 'right':
      return css`
        left: auto;
        right: 0;
      `;
    case 'left':
      return css`
        left: 0;
        right: auto;
      `;
    default:
      return '';
  }
};

const Container = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 0 auto;
  z-index: 99999;
  outline: none;
  position: fixed;
  top: 0;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  box-sizing: border-box;
  ${({ position }) => getPositionSpecificStyles(position)}
`;

const getDirection = (position) => {
  switch (position) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    default:
      return '';
  }
};

const Drawer = ({ children, open, position }) => (
  <Fragment>
    {open && <GlobalStyle />}
    <Slide in={open} direction={getDirection(position)} mountOnEnter unmountOnExit>
      <Container position={position}>
        { children }
      </Container>
    </Slide>
  </Fragment>
);

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
};

Drawer.defaultProps = {
  open: false,
  position: 'right',
};

export default Drawer;
