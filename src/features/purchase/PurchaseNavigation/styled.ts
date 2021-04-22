import styled from 'styled-components';

import { TTheme } from "../../../theme";

import BoxIcon from './BoxIcon';

export const PurchaseNavBody = styled.div`
    padding: 64px 0 40px 0;
`;

export const PurchaseNavGrid = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type NavItemBodyProps = {
    current: boolean;
};

export const NavItemBody = styled.div<NavItemBodyProps>`
    position: relative;
    overflow: visible;

    width: 8px;
    height: 8px;
    
    border-radius: 50%;
    
    background-color: ${({current}) => current ? '#FF5B00' : 'white'};
    border: ${({current}) => current ? 'none' : '1px solid #919191'};
`;

type NavItemTextProps = {
    theme: TTheme;
    current: boolean;
};

export const NavItemText = styled.div<NavItemTextProps>`
    position: absolute;
    
    left: 50%;
    transform: translateX(-50%);
    top: 16px;
    width: max-content;
    
    font-family: ${({ current, theme }) => current ? theme.fonts.medium : theme.fonts.light};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
`;

export const NavItemIcon = styled(BoxIcon)`
    position: absolute;
    
    left: 50%;
    transform: translateX(-50%);
    bottom: 22px;
`;

type NavFillerProps = {
    visited: boolean;
};

export const NavFiller = styled.div<NavFillerProps>`
    flex: 1;
    
    height: 1px;
    margin: 0 4px;
    
    border-bottom: ${({ visited }) => visited ? '1px solid #FF5B00' : '1px dashed #D5D5D5'};
`;

export const PurchaseNavMobileBody = styled.div`
    padding: 22px 20px;
    
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type NavItemMobileProps = {
    theme: TTheme;
    current: boolean;
};

export const NavItemMobile = styled.div<NavItemMobileProps>`
    font-family: ${({theme, current}) => current ? theme.fonts.medium : theme.fonts.light};
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    
    color: ${({current}) => current ? '#121212' : '#5C5C5C'};
`;
