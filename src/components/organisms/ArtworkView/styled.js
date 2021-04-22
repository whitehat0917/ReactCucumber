import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import Icon from 'atoms/Icon';

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <ReactModal
    className={modalClassName}
    portalClassName={className}
    {...props}
  />
);

export const Modal = styled(ReactModalAdapter).attrs({
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
        }
    
        &--before-close {
            opacity: 0;
        }
    
        overflow: auto;
        outline: none;
    
        max-height: calc(100% - 3rem);
        
        margin: 1.75rem 5rem; 
        z-index: 10;
        border: none;
        box-sizing: border-box;
        opacity: 0;
        width: 100%;
        height: 100%;
    
        @media only screen and (max-width: 768px) {
            margin: 0.25rem 0;
            max-height: 100%;
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

export const StyledIcon = styled(Icon)`
    position: absolute;
    right: 2.75rem;
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;

export const ImageContainerDesktop = styled(ImageContainer)`
    height: calc(100% - 7.5rem);
`;

export const ArrowContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover>svg *{
        fill: ${({ theme }) => theme.palette.white};    
    }
`;

export const ArrowContainerDesktop = styled(ArrowContainer)`
    top: 8rem;
    width: 10vw;
`;

export const ArrowLeftContainerDesktop = styled(ArrowContainerDesktop)`
    left: 0;  
`;

export const ArrowRightContainerDesktop = styled(ArrowContainerDesktop)`
    right: 0;  
`;

export const Arrow = styled((props) => <Icon width="1.5rem" height="1.5rem" {...props} />)`
    fill: ${({ theme }) => theme.palette.gray[80]};
`;
