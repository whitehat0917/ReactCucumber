import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import Button from '../Button';
import Icon from '../Icon';
import Typography from '../Typography';

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <ReactModal className={modalClassName} portalClassName={className} {...props} />
);

const StyledModal = styled(ReactModalAdapter).attrs({
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
      ${({ fullHeight }) => (fullHeight ? 'height: 100%' : '')};
      ${({ fullWidth }) => (fullWidth ? 'width: 100%' : '')};
    }

    &--before-close {
      opacity: 0;
    }

    background: #fff;
    overflow: auto;
    outline: none;

    max-height: calc(100% - 6rem);

    margin: 3rem;
    z-index: 10;
    max-width: 75rem;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 0.625rem;
    opacity: 0;
    ${({ fullWidth, width }) => (!fullWidth && width ? `width: ${width}rem` : '')};

    @media only screen and (max-width: 768px) {
      width: 100%;
      margin: auto 1rem;
    }
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
    background-color: rgba(7, 7, 10, 0.9);
    opacity: 0;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  @media only screen and (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`;

const CenteredText = styled(Typography)`
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 1.5rem !important;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SecondaryTextWrapper = styled.div`
  width: 40rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  ${({ fullHeight }) => (fullHeight ? 'height: 100%' : '')};
`;

const HeaderWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 4rem;
  margin-top: 1rem;
  flex-shrink: 0;

  @media only screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ dense }) => (dense ? '1rem 4rem 2.5rem' : '1.5rem 3rem 2.5rem')};
  position: relative;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const Modal = ({
  isOpen,
  onClose,
  onAfterOpen,
  title,
  subtitle,
  children,
  submitText,
  buttonsAreVisible,
  onCancelClick,
  onSubmitClick,
  submitIsDisabled,
  cancelIsDisabled,
  isLoading,
  fullWidth,
  fullHeight,
  submitButtonOnly,
  width,
  dense,
  ...rest
}) => (
  <StyledModal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel="Example Modal"
    closeTimeoutMS={150}
    fullWidth={fullWidth}
    fullHeight={fullHeight}
    appElement={document.createElement('div')}
    width={width}
    {...rest}
  >
    <Container id="uploadModalContent" dense={dense}>
      <StyledIcon size={0.75} onClick={onClose} clickable color="default">
        close
      </StyledIcon>
      <HeaderWrapper dense={dense}>
        <Wrapper>
          <CenteredText type={dense ? 'h4' : 'h3'}>{title}</CenteredText>
          {subtitle && (
            <FlexWrapper>
              <SecondaryTextWrapper>
                <CenteredText type="small" color="subtitle" style={{ marginTop: '0.375rem' }}>
                  {subtitle}
                </CenteredText>
              </SecondaryTextWrapper>
            </FlexWrapper>
          )}
        </Wrapper>
      </HeaderWrapper>
      <ContentWrapper fullHeight={fullHeight}>{children}</ContentWrapper>
      {buttonsAreVisible && submitButtonOnly && (
        <ActionButtonsWrapper>
          <Button loading={isLoading} fullWidth onClick={onSubmitClick} disabled={submitIsDisabled} id="modalSubmit">
            {submitText}
          </Button>
        </ActionButtonsWrapper>
      )}
      {buttonsAreVisible && !submitButtonOnly && (
        <ActionButtonsWrapper>
          <Button
            loading={isLoading}
            size="small"
            style={{ marginRight: '1rem' }}
            onClick={onSubmitClick}
            disabled={submitIsDisabled}
            id="modalSubmit"
          >
            {submitText}
          </Button>
          <Button
            size="small"
            styleType="outlined"
            onClick={onCancelClick}
            disabled={cancelIsDisabled}
            id="modalCancel"
          >
            Cancel
          </Button>
        </ActionButtonsWrapper>
      )}
    </Container>
  </StyledModal>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAfterOpen: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  buttonsAreVisible: PropTypes.bool,
  submitText: PropTypes.string,
  onCancelClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  submitIsDisabled: PropTypes.bool,
  cancelIsDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  submitButtonOnly: PropTypes.bool,
  width: PropTypes.number,
  dense: PropTypes.bool,
};

export default Modal;
