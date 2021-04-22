import styled from 'styled-components';
import {Link} from "react-router-dom";

import { ArtworkMeta } from '../../artwork/ArtworksSlider/styled';
import { TTheme } from 'theme';

export const InfoPanelBody = styled(ArtworkMeta)`
    padding-left: 40px !important;
    padding-right: 40px !important;
`;

type ThemedProps = {
    theme: TTheme
};

export const ArtistName = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin-top: 10px;
`;

export const ProductName = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -0.02em;
    
    margin-top: 84px;
`;

export const ProductPrice = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 36px;
    
    margin-top: 12px;
`;

type ProductInfoBoxProps = {
    isDesktop: boolean
};

export const ProductInfoBox = styled.div<ProductInfoBoxProps>`
    display: flex;
    flex-direction: ${({isDesktop}) => isDesktop ? 'column' : 'row'};
    flex-wrap: ${({isDesktop}) => isDesktop ? 'nowrap' : 'wrap'};
    align-items: stretch;
    
    width: 100%;
    
    & > div {
        width: ${({isDesktop}) => isDesktop ? '100%' : '50%'};
    }
`;

export const ProductInfoItem = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    
    margin-bottom: 8px;
`;

type ProductStatusProps = {
    theme: TTheme,
    status: number
};

export const ProductStatus = styled.div<ProductStatusProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    
    color: ${({ theme, status }) => theme.palette.statuses[status] };
`;

export const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    width: 100%;
    margin-top: 28px;
    margin-bottom: 20px;
    box-sizing: border-box;
`;

const BaseButton = styled.button`
    height: 48px;
    border-radius: 7px;
    
    border: none;
    
    cursor: pointer;
    
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 0.01em;
`;

export const BuyButton = styled(BaseButton)`
    width: 100%;
    margin-bottom: 12px;
    
    color: #FFFFFF;
    background-color: #FF5B00;
`;

export const SoldOutButton = styled(BaseButton)`
    width: 100%;
    margin-bottom: 12px;
    
    color: #FFFFFF;
    background: #919191;
    
    cursor: initial;
`;

export const QuestionButton = styled(BaseButton)`
    color: #121212;
    background-color: white;
    border: 1px solid #D5D5D5;
    width: 100%;
`;

export const CloseButtonDesktop = styled(Link)`
    position: absolute;
    top: 37px;
    right: 40px;
    color: ${({ theme }) => theme.palette.gray['100']};
`;

export const CloseButtonMobile = styled.button`
    position: absolute;
    top: 21px;
    right: 26px;
    color: ${({ theme }) => theme.palette.gray['50']};
    border: none;
    background-color: transparent;
`;
