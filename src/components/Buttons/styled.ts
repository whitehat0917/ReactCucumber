import styled from 'styled-components';
import { MobileButtonsProps } from './MobileButtons';

export const Button = styled.button<MobileButtonsProps>`
    outline: 0;
    width: ${({ width }) => width || '100%'};
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    background: ${({ theme, isDisabled, isInversed }) => isDisabled && !isInversed
            ? theme.palette.primary['10']
            : isDisabled
                ? theme.palette.primary['70']
                : !isInversed
                    ? theme.palette.primary['30']
                    : theme.palette.appBackground
    };
    font-family: ${({ theme }) => theme.fonts.medium};
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    font-family: inherit;
    border: none;
    padding: 0;
    line-height: 160%;
    color: ${({ isDisabled, theme, isInversed }) =>isDisabled && !isInversed 
            ? theme.palette.gray['40']
            : isDisabled 
                ? theme.palette.primary['60']
                : !isInversed
                    ? theme.palette.appBackground
                    : theme.palette.primary['30']
    };

    &:focus {
        text-decoration: none;
        border: 2px solid #0F77FF;
        box-sizing: border-box;
        -webkit-box-shadow: 0px 0px 4px rgba(15, 119, 255, 0.6);
        box-shadow: 0px 0px 4px rgba(15, 119, 255, 0.6);
        transition: black 2s ease-out;
    }

    &:active {
        height: 50.4px;
        background: ${({ theme, isInversed }) =>!isInversed 
                ? theme.palette.primary['40'] 
                : theme.palette.primary['80']
    };
        color: ${({ theme, isInversed }) => !isInversed
                ? theme.palette.appBackground
                : theme.palette.primary['60']
    };
    }
`;


export const ErrorMsg = styled.div`
    color: ${({ theme }) => theme.palette.error};
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.medium}
`;