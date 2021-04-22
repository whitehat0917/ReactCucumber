import styled from 'styled-components';

import {
    ThemedProps,
    AdaptiveProps,
    ThemedAdaptiveProps
} from "../styled";

import CheckIcon from "./CheckIcon";

export const SuccessPageBody = styled.div`
    width: 100%;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const SuccessPageHeader = styled.div`
    background: #FFFFFF;
    border-bottom: 1px solid #EAEAEA;
    
    padding: 12px;
    
    display: flex;
    justify-content: center;
`;

export const SuccessPageInfoContainer = styled.div`
    flex: 1;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SuccessPageInfoBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SuccessPageTitle = styled.div<ThemedAdaptiveProps>`
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-style: normal;
    font-weight: 800;
    font-size: ${({ isDesktop }) => isDesktop ? '48px' : '36px'};
    line-height: ${({ isDesktop }) => isDesktop ? '40px' : '44px'};
    letter-spacing: 0.02em;
    text-align: center;
    
    color: #000000;
    
    margin: 66px 19px 0 19px;
`;

export const SuccessPageSubtitle = styled.div<ThemedAdaptiveProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: ${({ isDesktop }) => isDesktop ? 'normal' : '300'};
    font-size: ${({ isDesktop }) => isDesktop ? '17px' : '16px'};
    line-height: ${({ isDesktop }) => isDesktop ? '23px' : '24px'};
    letter-spacing: -0.02em;
    text-align: center;
    
    color: #000000;
    
    margin: 16px 19px 0 19px;
`;

export const SuccessPageOrderId = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 160%;
    
    color: #919191;
    
    margin-top: 23px;
`;

export const BackButton = styled.button<ThemedProps>`
    width: 230px;
    height: 56px;
    
    margin-top: 62px;

    color: #FFFFFF;
    background: #FF5B00;
    border: none;
    border-radius: 12px;
    
    font-family: ${({ theme }) => theme.fonts.medium};
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    
    text-align: center;
    
    cursor: pointer;
`;

export const SuccessPageIcon = styled(CheckIcon)<AdaptiveProps>`
    ${({ isDesktop }) => isDesktop ? '' : `
        width: 100px;
        height: 100px;
    `}
`;
