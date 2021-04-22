import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Logo from 'molecules/Logo';
import Icon from 'atoms/Icon';
import Typography from 'atoms/Typography';
import { isLinkActive } from 'utils/common';

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <ReactModal
    className={modalClassName}
    portalClassName={className}
    {...props}
  />
);

const Modal = styled(ReactModalAdapter).attrs({
  overlayClassName: {
    base: 'Overlay',
    afterOpen: 'Overlay--after-open',
    beforeClose: 'Overlay--before-close',
  },
  modalClassName: {
    base: 'Modal',
    afterOpen: 'Modal--after-open',
    beforeClose: 'Modal--before-close',
  },
})`
  .Modal {
    &--after-open {
      opacity: 1;
      transition: opacity 150ms;
      display: flex;
      flex-direction: column;
      padding: 1.46rem 1.75rem;
    }

    &--before-close {
      opacity: 0;
    }

    overflow: auto;
    outline: none;
    
    z-index: 10;
    border: none;
    box-sizing: border-box;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .Overlay {
    &--after-open {
      opacity: 1;
      transition: opacity 150ms;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--before-close {
      opacity: 0;
    }

    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background-color: #FFFFFF;
    opacity: 0;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: auto;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonts.primaryHeavy};
  font-weight: 600;
  font-size: 2.25rem;
  margin: 0.5rem 0;

  ${({ isActive, theme }) => (isActive ? `
    cursor: pointer;
    color: ${theme.palette.primary[30]}};
  ` : '')}

  :hover {
    cursor: pointer;
  }
`;

const LinksWrapper = styled.div`
  margin-top: 2.708rem;
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  :hover {
    cursor: pointer;
  }
`;

const LogoAndTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4.5rem;
`;

const LinksAndLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: auto;
`;

const PrimaryColoredTextWrapper = styled.span`
  color: ${({ theme }) => theme.palette.primary[30]};
`;

const BurgerDrawerModal = ({
  match, isOpen, onClose, onPageLinkClick, onContactLinkClick,
  publicUserInfo: { marcel_username: userName },
}) => (
  <Modal
    appElement={document.createElement('div')}
    closeTimeoutMS={150}
    isOpen={isOpen}
  >
    <IconWrapper>
      <Icon clickable size={1} onClick={onClose}>close</Icon>
    </IconWrapper>
    <LinksAndLogoWrapper>
      <LinksWrapper>
        <StyledTypography
          type="h4"
          // onClick={onPageLinkClick(`/${userName}` || '/')}
          fontFamily="secondary"
          // isActive={isLinkActive(`/${userName}`, match.url)}
        >
          Home
        </StyledTypography>
        <StyledTypography
          type="h4"
          // onClick={onPageLinkClick(`/${userName}/collections` || '/')}
          fontFamily="secondary"
          // isActive={isLinkActive(`/${userName}/collections`, match.url)}
        >
          Collections
        </StyledTypography>
        <StyledTypography
          type="h4"
          // onClick={onPageLinkClick(`/${userName}/about` || '/')}
          fontFamily="secondary"
          // isActive={isLinkActive(`/${userName}/about`, match.url)}
        >
          About
        </StyledTypography>
        <StyledTypography
          type="h4"
          onClick={onContactLinkClick}
          fontFamily="secondary"
        >
          Contact
        </StyledTypography>
      </LinksWrapper>
      <LogoAndTextWrapper>
        <Logo iconOnly />
        <Typography type="small" style={{ marginTop: '0.125rem' }} color="#5C5C5C">
          Made with
          {' '}
          <PrimaryColoredTextWrapper>Marcel</PrimaryColoredTextWrapper>
        </Typography>
      </LogoAndTextWrapper>
    </LinksAndLogoWrapper>
  </Modal>
);

// BurgerDrawerModal.propTypes = {
//   publicUserInfo: PropTypes.shape({
//     userName: PropTypes.string,
//   }),
//   match: PropTypes.shape({
//     url: PropTypes.string,
//   }),
//   isOpen: PropTypes.bool,
//   onClose: PropTypes.func,
//   onPageLinkClick: PropTypes.func,
//   onContactLinkClick: PropTypes.func,
// };

export default BurgerDrawerModal;
