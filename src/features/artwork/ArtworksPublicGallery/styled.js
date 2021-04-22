import styled, {css, keyframes} from 'styled-components';
import ContentWrapper from '../../../components/ContentWrapper';
import { NavLink } from 'react-router-dom';

export const GridWrapper = styled.div`
    margin: 3rem auto 60px;
    max-width: 1240px;

    @media only screen and (max-width: 768px) { 
        margin-top: 1.5rem;
        padding: 0 .5rem;
    }
`;

export const MobileContentWrapper = styled(ContentWrapper)`
    padding: 0 0 0.5rem;
`;

const appear = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const appearMixin = css`
    animation: ${appear} 1s linear 1;
`;

export const CardWrapper = styled.div`
    padding: ${({ isCollection }) => (isCollection ? '1rem 1rem 1rem 0' : '1rem')};
    width: 100%;

    ${({isNew}) => isNew ? appearMixin : ''}

    @media (min-width: 576px) {
        width: 50%;
    }

    @media (min-width: 768px) {
        width: 33.3%;
    }

    @media (min-width: 992px) {
        width: 25%;
    }

    /* @media (min-width: 1200px) {
        width: ${({ isCollection }) => (isCollection ? '25%' : '20%')};
    } */

    @media only screen and (max-width: 768px) { 
        width: 50%;
        padding: ${({ isCollection }) => (isCollection ? '0.344rem' : '0.125rem')};
    }

    box-sizing: border-box;
`;

export const SwitcherWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    box-sizing: border-box;
`;

export const DotsContainer = styled.div`
    margin: 0.25rem 0 0 0;
    display: flex !important;
    justify-content: flex-end;
    width: 100%;
    transition: all .3s;
`;

export const DotsHolder = styled.div`
    display: flex !important;
    justify-content: center;
    padding: 8px 0 12px 8px;
    width: auto;

    /* @media (max-width: 1023px){
        opacity: 0;
    } */
`;

export const Dot = styled.div`
    z-index: 10;
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.palette.sliderDots};
    border-radius: 50%;
    cursor: pointer;
    margin-left: 10px;
    box-shadow: -2px 8px 10px rgba(0, 0, 0, .2);

    &:first-child {
        margin-left: 0;
    }

    &.slick-active {
        background-color: ${({ theme }) => theme.palette.primary['30']};
    }

    button {
        display: none;
    }
`;

export const EditLink = styled(NavLink)`
    text-decoration: none;
`;
