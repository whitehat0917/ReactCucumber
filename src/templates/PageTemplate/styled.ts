import styled from 'styled-components';

export const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    min-width: 280px;
    height: 100%;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    min-width: 280px;
    height: 100%;

    @media screen and (min-width: 1340px) {
        padding: 0%;
    }
`;

type THeader = {
    position: string
}

export const Header = styled.header`
    position: ${({ position }: THeader) => position};
    top: 0;
    left: 0;
    margin: 0 auto;
    max-width: 1240px;
    width: 100%;
    z-index: 998;
    background-color: ${({ theme }) => theme.palette.white};

    @media (max-width: 991px) {
        border-color: transparent;
    }
`;

type TContent = {
    isPublicGallery?: boolean
}

export const Content = styled.section`
    flex: 1 0 auto;
    width: 100%;
    min-height: calc(100vh - 101px - 164px);
    /* @media (max-width: 991px) {
        margin-top: ${({ isPublicGallery }: TContent) => (isPublicGallery ? '0' : '4.5rem')};
    }*/
`;

export const Footer = styled.footer`
    z-index: 2;
    flex: 0 0 auto;
    height: auto;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.appBackground};
    box-sizing: border-box;
`;
