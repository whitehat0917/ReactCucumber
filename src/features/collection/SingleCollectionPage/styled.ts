import styled, {css, keyframes} from 'styled-components';
import ContentWrapper from '../../../components/ContentWrapper';
import { NavLink } from 'react-router-dom';

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
    /* padding: ${({ isCollection }) => (isCollection ? '1rem 1rem 1rem 0' : '1rem')}; */
    padding: 0 6px 12px 6px;
    width: 50%;
    
    ${({ isNew }) => isNew ? appearMixin : ''}

    @media (min-width: 768px) and (max-width: 991px) {
        width: 33.3%;
    }

    @media (min-width: 992px) {
        width: 25%;
        padding: 0 10px 20px 10px;
    }

    /* @media (min-width: 1200px) {
        width: ${({ isCollection }) => (isCollection ? '25%' : '20%')};
    } */
`;

export const SwitcherWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    box-sizing: border-box;
`;

export const Title = styled.h1`
    margin: 0 0 16px;
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 48px;
    color: ${({ theme }) => theme.palette.gray['100']};

    @media (min-width: 679px){
        font-size: 64px;
        margin: 8px 0 10px;
    }
`;

export const Description = styled.div`
    margin: 0 0 16px;
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 18px;
    color: ${({ theme }) => theme.palette.gray['60']};

    @media (min-width: 679px) {
        margin: 0 0 48px;
    }
`;

export const TitleAndBioWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    margin-bottom: 1.3125rem;
    box-sizing: border-box;

    @media only screen and (max-width: 768px) {
        /* text-align: center; */
        /* padding: 0 1rem; */
    }
`;

export const GridWrapper = styled.div`
    max-width: 1240px;
    margin: 0 auto;
    box-sizing: border-box;
`;
export const MobileContentWrapper = styled(ContentWrapper)`
    padding: 0 0 0.5rem;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ImageStub = styled.div`
    background-color: ${({ theme }) => theme.palette.gray[30]};
    height: 15rem;
    width: 100%;
    cursor: pointer;
`;

export const Dot = styled.div`
    width: 0.3125rem;
    height: 0.3125rem;
    background-color: ${({ active }) => (active ? '#FF5F0E' : '#C9CBCC')};
    border-radius: 50%;
    cursor: pointer;
    margin-left: 0.25rem;
`;

export const DotsContainer = styled.div`
    margin: 0.25rem 0 0 0;
    display: flex;
    justify-content: flex-end;
`;

// Artwork Card Image
type ImageContainerProps = {
    height: string
    width: string
};

export const ImageContainer = styled(NavLink)<ImageContainerProps>`
    display: block;
    height: ${({ height }) => `${height}px`};
    width: ${({ width }) => `${width}px`};
    cursor: pointer;
    overflow: hidden;
`;

export const BlurWrapper = styled.div`
    ${({ blurred }) => (blurred ? 'filter: blur(8px);' : '')}
    transition: filter 0.3s; 
    overflow: hidden; 
`;

type ArtworkImageProps = {
    loaded: boolean
    height: string
    width: string
    src: string
};

export const ArtworkImage = styled.img<ArtworkImageProps>`
    height: ${({ height }) => `${height}px`};
    /* width: ${({ width }) => width}; */
    object-fit: contain;
    filter: ${({ loaded }) => !loaded ? 'blur(25px)' : 'blur(0)'};
    transform: scale(1);
`;

export const ArtworksHolder = styled.div`
    max-width: 1240px;
    width: 100%;
    margin: 0 auto 80px;
`;
