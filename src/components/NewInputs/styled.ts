import styled from 'styled-components';

import { TTheme } from 'theme';

export const TextInputBody = styled.div`
    width: 100%;
    margin: 2px 0 16px 0;
`;

export interface ThemedProps {
    theme: TTheme
}

export const TextInputCtrl = styled.input<ThemedProps>`
    border: 1px solid #eaeaea;
    border-radius: 6px;
    
    padding: 16px;
    
    width: 100%;
    
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
`;

export const ErrorMsg = styled.div<ThemedProps>`
    margin-top: 2px;
    padding-left: 6px;
    
    color: ${({ theme }) => theme.palette.error};
    
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;
