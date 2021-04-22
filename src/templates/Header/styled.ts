import styled from 'styled-components';
import Button from '../../components/Button';
import { TTheme } from '../../theme';
import { Link } from 'react-router-dom';

type TUserName = {
    isOpen: boolean,
    theme: TTheme,
};

export const ArtistHomeLink = styled(Link)`
    text-decoration: none;
`;

export const UserName = styled.p<TUserName>`
    margin: 0;
    padding: 6px 0 0;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: 20px;
    font-style: normal;
    color: ${({ theme }) => theme.palette.gray['100']};
    opacity: ${({ isOpen }) => isOpen ? 0 : 1};
    transition: .2s opacity; 
`;

type THeaderWrapper = {
    hideView: boolean,
    isHomeAbout: string,
    theme: TTheme,
}

export const HeaderWrapper = styled.div<THeaderWrapper>`
    background: ${({ theme }) => theme.palette.white};
    box-sizing: border-box;
    /* border-bottom: 1px solid ${({ theme }) => theme.palette.gray['45']}; */
    /* animation: ${({ hideView, theme }: THeaderWrapper) => (hideView ? theme.animations.slideUp : theme.animations.slideDown)} .5s forwards cubic-bezier(0.39, 0.575, 0.565, 1); */
    z-index: 2;

    padding: ${({ isHomeAbout }) => !isHomeAbout || isHomeAbout === 'about'
        ? '0 20px'
        : '0'};

    @media screen and (min-width: 769px) {
        border-bottom: 1px solid ${({ theme }) => theme.palette.gray['45']};
    }

    @media screen and (min-width: 1240px) {
        padding: 0;
        border-bottom: 1px solid ${({ theme }) => theme.palette.gray['45']};
    }
`;

type TMainAndButtonsWrapper = {
    isDesktop: boolean,
    theme: TTheme,
}

export const MainAndButtonsWrapper = styled.div<TMainAndButtonsWrapper>`
    display: ${({ isDesktop }) => isDesktop ? 'flex' : 'block'};
    position: relative;
    padding: 21px 0;

    @media screen and (min-width: 769px) {
        padding: 21px 0;
        height: 76px;
    }
`;

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`;

export const NameAndBioWrapper = styled.div`
    display: flex;  
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    width: 100%;
    margin-top: 0;
`;

export const ContactButtonWrapper = styled.div`
    margin-top: 1.25rem;
`;

export const ContactButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconWrapper = styled.div`
    top: 1rem;
    right: 0;
    position: absolute;

    :hover {
        cursor: pointer !important;
    }
`;