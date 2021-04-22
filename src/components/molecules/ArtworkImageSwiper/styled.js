import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    .control-dots {
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: ${({ isFullScreen }) => (isFullScreen
    ? '15% !important'
    : '33% !important')};
        transition: top 0.3s ease-in-out;
        padding: 0;
        transform: translateX(50%);
        right: 50%;
        margin: 0 !important;
        background: transparent;
        border-radius: 1.25rem;
        visibility: ${({ hasMultipleImages }) => (hasMultipleImages ? 'visible' : 'hidden')};

        .dot {
            margin: 0 0.3rem 0 0 !important;
            background: #565656 !important;
            opacity: 1 !important;
            box-shadow: none !important;

            &:last-child {
                margin: 0 !important;
            }
        }

        .dot.selected {
            background: rgb(255, 91, 0) !important;
        }
    }

    span.control-dots {
        background: ${({ theme }) => theme.palette.white};
    }
`;

export const BlurredImageOverlay = styled.div`
    background: #000;
    opacity: 1;
    width: 100vw;
    height:  100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

export const Slide = styled.section`
    background: transparent;
    width: 100%;
    /*height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : '60vh')};*/
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    /*border-right: ${({ theme, isSliding }) => (isSliding ? `0.1rem solid ${theme.palette.gray[10]}` : 'none')};*/
    box-sizing: border-box;

    img {
        object-fit: fill;
        width: 100%;
        height: fit-content;
    }

    &:hover {
        cursor: grab;
    }
`;

export const CloseIconWrapper = styled.span`
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 50%;
    opacity: ${({ isControls }) => (isControls ? '1' : '0')};
    box-shadow: -2px 5px 10px rgba(0, 0, 0, .2);
    transition: all .3s;
    &:hover {
        cursor: pointer;
    }
`;

export const ShowDetailsButton = styled.div`
    width: 140px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 17px;
    background-color: #fff;
    border-radius: 25px;
    visibility: ${({ isLandscape }) => (isLandscape ? 'hidden' : 'visible')};
    opacity: ${({ isControls }) => (isControls ? '1' : '0')};
    box-shadow: -2px 5px 10px rgba(0, 0, 0, .2);
    transition: all .3s;
`;

export const ButtonsWrapper = styled.div`
    width: 100%;
    padding: 1rem 1.25rem;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ACTIVE_DOT_COLOR = '#FF5F0E';
export const DOT_COLOR = '#C9CBCC';

export const Dot = styled.div`
    width: 0.3125rem;
    height: 0.3125rem;
    background-color: ${({ active }) => (active ? ACTIVE_DOT_COLOR : DOT_COLOR)};
    border-radius: 50%;
    cursor: pointer;
    margin-left: 0.25rem;
    box-shadow: -2px 8px 10px rgba(0, 0, 0, .2);
`;

export const DotsContainer = styled.div`
    margin: 0.25rem 0 0 0;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 16%;
    width: 100%;
    opacity: ${({ isControls }) => (isControls ? '1' : '0')};
    transition: all .3s;
`;


// const BlurredImage = styled.div`
//   background-image: ${({ imageUrl }) => `url(${imageUrl})`};
//   filter: blur(1rem);
//   -webkit-filter: blur(1rem);
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   width: 100vw;
//   height:  100vh;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
// `;

// const BlurredImageOverlay = styled.div`
//   background: ${({ theme }) => theme.palette.gray[100]};
//   opacity: 0.6;
//   width: 100vw;
//   height:  100vh;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
// `;

// const FullScreenButtonWrapper = styled.span`
//   width: 5.8rem;
//   height: 2.3rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 0.5rem;
//   background: ${({ theme }) => theme.palette.gray[100]};
//   opacity: 0.7;

//   &:hover {
//     cursor: pointer;
//   }
// `;
