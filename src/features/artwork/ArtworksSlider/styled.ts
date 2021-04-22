import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { TTheme } from 'theme';

export const SliderOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 998;
    @media (min-width: 1024px){
        opacity: 0.92;
    }
`;

export const NextArrow = styled.div`
    position: absolute;
    top: 50%;
    right: -10%;
    transform: translateY(-50%);
    font-size: 36px;
    font-family: 'slick';
    line-height: 1;
    opacity: .75;
    color: white;
    cursor: pointer;

    @media screen and (min-width: 1410px) {
        right: -10%;
    }

    @media screen and (min-width: 991px) and (max-width: 1409px) {
        right: 0;
    }
`;

export const PrevArrow = styled(NextArrow)`
    left: -10%;

    @media screen and (min-width: 1410px) {
        left: -10%;
    }

    @media screen and (min-width: 991px) and (max-width: 1409px) {
        left: 0;
    }
`;

export const SliderHolder = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 100%;
    z-index: 999;
    height: 100%;
    .slick-slider {
    height: 100%;
}
    .slick-prev, .slick-next {
        background-color: #000;
    }

    .slick-prev {
        left: -100px;
    }

    .slick-next {
        right: -48px;
    }

    .slick-prev:before, .slick-next:before {
        font-size: 70px;
    }

    @media screen and (min-width: 1024px) {
        left: 33%;
        max-width: 740px;
        max-height: 740px;
    }
`;

export const Dot = styled.div`
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
        background-color: ${({ theme }) => theme.palette.sliderDotsActive};
    }

    button {
        display: none;
    }
`;


export const DotsHolder = styled.div`
    display: flex !important;
    justify-content: center;
    padding: 8px 0 12px 8px;
    width: 100%;
`;

export const DotsContainer = styled.div`
    margin: 0.25rem 0 0 0;
    display: flex !important;
    left: 25%;
    right: 25%;
    bottom: 10% !important;
    width: auto !important;
    transition: all .3s;
    @media screen and (min-width: 1024px) {
        bottom: -35% !important;
    }
`;


export const ArtworkSlide = styled.div`
    position: relative;
    display: flex !important;
    margin: 0 auto;
    max-height: ${({height})=>height?`${height}px`:'100%'};
    height: 100%;
    width: 100%;
`;

export const ArtworkImageHolder = styled.div`
    width: 100%;
    margin: 0 auto;
    max-height: 100%;
`;



export const ArtworkImage = styled.div`
    width: 100%;
    padding-top: 100%;
    height:${({height})=>`${height}px`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${({imageUrl})=>`url(${imageUrl})`};
    transition: all .3s;
    pointer-events: none;
    @media screen and (min-width: 1410px) {
        max-width: 740px;
        max-height: 740px;
    }

    @media screen and (min-width: 991px) and (max-width: 1409px) {
        max-width: 540px;
        max-height: 540px;
    }
`;

type TArtworkMeta = {
    isDesktop: boolean
    isActive: boolean
};

export const ArtworkMeta = styled.div<TArtworkMeta>`
    position: fixed;
    top: ${({ isDesktop }) => isDesktop ? '0' : 'auto'};
    right: 0;
    bottom:  ${({ isDesktop }) => isDesktop ? 'auto' : '0'};
    padding: ${({ isDesktop }) => isDesktop ? '24px 0 0 40px' : '14px 0 40px 20px'};
    max-width: ${({ isDesktop }) => isDesktop ? '350px' : '100%'};
    width: 100%;
    height:  ${({ isDesktop }) => isDesktop ? '100%' : 'auto'};
    background: #fff;
    z-index: 1000;
    transition: width .3s;
    border-radius: ${({ isDesktop }) => isDesktop ? '0' : '0.75rem 0.75rem 0 0'};
    transform: ${({ isActive, isDesktop }) => !isDesktop && isActive ? 'translateY(100%)' : 'translateY(0)'};
    transition: transform .3s;
    z-index: 1002;

    @media screen and (min-width: 1410px) {
        max-width: 500px;
    }

    @media screen and (min-width: 1148px) and (max-width: 1409px) {
        padding: 24px 0 0 80px;
        max-width: 400px;
    }
`;

export const ArtworkMetaTitle = styled.h1`
    margin: 0 0 36px;
    color: ${({ theme }) => theme.palette.gray['100']};
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-weight: 800;
    font-size: 28px;

    @media screen and (min-width: 1148px) {
        font-size: 36px;
    }
`;

export const ArtworkMetaOption = styled.p`
    margin: 0 0 16px;
    color: ${({ theme }) => theme.palette.gray['100']};
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 16px;
    font-weight: 300;

    &:last-child {
        margin: 0;
    }

    @media screen and (min-width: 1148px) {
        font-size: 18px;
    }
`;

export const ArtworkMetaBottom = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 90px;

    p {
        margin: 0 8px 0 0;
    }
`;

export const ArtworkMetaLogoHolder = styled.div`
    margin: 0 0 60px;
    width: 30%;
`;

export const ContactArtist = styled(NavLink)`
    color: ${({ theme }) => theme.palette.primary['30']};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: 14px;
    text-decoration: none;

    @media screen and (min-width: 1148px) {
        font-size: 16px;
    }
`;

export const CloseButtonMobile = styled.button`
    position: absolute;
    top: 26px;
    right: 32px;
    width: 16px;
    height: 18px;
    font-size: 24px;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.gray['50']};
    border: none;
    background-color: transparent;

    span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background-color: ${({ theme }) => theme.palette.gray['50']};
        border-radius: 4px;
        opacity: 1;
        left: 0;

        &:nth-child(1) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
        
        &:nth-child(2) {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        
        &:nth-child(3) {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        
        &:nth-child(4) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
    }
`;

export const CloseButtonHolder = styled(Link)`
    position: absolute;
    top: 48px;
    right: 42px;
    width: 27px;
    height: 18px;
    font-size: 24px;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.gray['100']};

    span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background-color: ${({ theme }) => theme.palette.gray['100']};
        border-radius: 4px;
        opacity: 1;
        left: 0;

        &:nth-child(1) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
        
        &:nth-child(2) {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        
        &:nth-child(3) {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        
        &:nth-child(4) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
    }
`;

type TShowDetailsButton = {
    isDesktop: boolean
    isLandscape: boolean
    isTablet: boolean
    isShowBadges: boolean
};

export const ShowDetailsButton = styled.div<TShowDetailsButton>`
    position: absolute;
    bottom: 3%;
    left: 50%;
    width: 140px;
    height: 36px;
    display: flex;
    opacity: ${({ isShowBadges }) => isShowBadges ? 1 : 0}!important;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    transform: translateX(-50%);
    text-align: center;
    font-size: 17px;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: -2px 5px 10px rgba(0, 0, 0, .2);
    z-index: 1001;
    transition: opacity .3s;
    pointer-events: ${({ isShowBadges }) => isShowBadges ? 'auto' : 'none'};
    @media (min-width:1024px) {
        display: none;
    }
`;

export const Wrapper = styled.section`
    width: 100%;
    background: ${({ theme }) => theme.palette.white};
    border-radius: 0.75rem 0.75rem 0 0;
    z-index: 1;
    padding-bottom: 3rem;
    position: fixed;
    bottom: 0;
    left: 0;
    transition: transform .3s;
`;

type TCloseMobileHolder = {
    theme: TTheme
    isShowBadges: boolean
}

export const CloseMobileHolder = styled(Link)<TCloseMobileHolder>`
    display: flex;
    opacity: ${({ isShowBadges }) => isShowBadges ? 1 : 0};
    height: 28px;
    width: 28px;
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 36px;
    position: absolute;
    top: 16px;
    right: 20px;
    justify-content: center;
    align-items: center;
    z-index: 999;
    pointer-events: ${({ isShowBadges }) => isShowBadges ? 'auto' : 'none'};
    @media (min-width: 1024px){
        display: none;
    }
`;


export const CloseMobile = styled.div`
    width: 12px;
    height: 12px;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.gray['100']};
    position: relative;

    span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background-color: ${({ theme }) => theme.palette.gray['100']};
        border-radius: 4px;
        left: 0;
        top: 5px;

        &:nth-child(1) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
        
        &:nth-child(2) {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        
        &:nth-child(3) {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        
        &:nth-child(4) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
    }
`;

type TArtworkStatus = {
    theme: TTheme
    status: number
}

export const ArtworkStatus = styled.span<TArtworkStatus>`
    display: inline-block;
    margin: 0 0 16px;
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 16px;
    font-weight: 300;
    color: ${({ theme, status }) => theme.palette.statuses[status] };
`;

export const ArtworkSliderHolder = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const ArtworkSliderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

export const ArtworkSliderHitBox = styled.div`
    position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`
