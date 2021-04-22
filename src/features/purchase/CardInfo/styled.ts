import styled from 'styled-components';

import {TTheme} from 'theme';

import ElementHolder from "./ElementHolder";

type ThemedProps = {
    theme: TTheme;
};

type StatusProps = {
    theme: TTheme;
    status: string;
}

export const ElementHolderBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

function colorFromStatus(status) {
    switch (status) {
        case 'error':
            return '#FF3B30';

        case 'value':
            return '#FF5B00';

        default:
            return '#919191'
    }
}

export const ElementHolderLabel = styled.div<StatusProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    
    color: ${({ status }) => colorFromStatus(status)};
`;

export const ElementHolderChildren = styled.div<StatusProps>`
    align-self: stretch;
    
    padding: 12px 0;
    border-bottom: 1px solid ${({ status }) => colorFromStatus(status)};
`;

export const ElementHolderError = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    
    color: #FF3B30;
`;

export const CardInfoItem = styled(ElementHolder)`
    margin-bottom: 30px;    
`;

export const CardInfoRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CardInfoRowItem = styled(CardInfoItem)`
    flex: 1;
    
    &:not(:first-child) {
        margin-left: 20px;
    }
`;
