import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from 'atoms/Avatar';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  height: 4.5rem;
  padding: 0 1.25rem;
  background: ${({ theme }) => theme.palette.white};
  animation: ${({ hideView, theme }) => (hideView ? theme.animations.slideUp : theme.animations.slideDown)} .5s forwards cubic-bezier(0.39, 0.575, 0.565, 1);
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[25]};
`;

const IconWrapper = styled.div`
  :hover {
    cursor: pointer !important;
  }
`;

const ScrollHeaderMobile = ({
  openBurgerModal, name, primaryImage, isScrollUp, hideScrollView,
}) => (
  <Wrapper isScrollUp={isScrollUp} hideView={hideScrollView}>
    <Avatar type="square" src={primaryImage} size={2} />
    <Typography
      type="h3"
      fontSize="1rem"
      style={{ flexGrow: 1, marginLeft: '0.5rem', fontWeight: '600' }}
    >
      {name}
    </Typography>
    <IconWrapper>
      <Icon size={1.5} clickable onClick={openBurgerModal}>menu</Icon>
    </IconWrapper>
  </Wrapper>
);

// ScrollHeaderMobile.propTypes = {
//   openBurgerModal: PropTypes.func.isRequired,
//   name: PropTypes.string,
//   primaryImage: PropTypes.string,
//   isScrollUp: PropTypes.bool,
//   hideScrollView: PropTypes.bool,
// };

export default ScrollHeaderMobile;
