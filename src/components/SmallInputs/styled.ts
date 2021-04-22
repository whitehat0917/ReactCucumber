import styled from 'styled-components';
import { TTheme } from 'theme';

export const InputHolder = styled.div`
    position: relative;
    height: 71px;
    width: 100%;
    margin: 30px 0 0px;
    z-index: 1;
    
    @media (min-width: 1024px){
        height: 60px;
    }
`;

export const SelectHolder = styled.div`
    position: relative;
    height: 71px;
    width: 100%;
    margin: 35px 0 0px;
    
    @media (min-width: 1024px){
        height: 95px;
        margin: 60px 0 0;
    }
`;

type TPlaceholder = {
    theme: TTheme,
    error: boolean,
    value: boolean,
};

export const Placeholder = styled.span<TPlaceholder>`
    display: inline-block;
    position: relative;
    pointer-events: none;
    top: -32px;
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: ${({ theme, value }) => value
    ? theme.palette.primary['30']
    : theme.palette.gray['50']};

    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    @media (min-width: 1024px){
        font-size: 20px;
        top: -40px;
    }
`;

export type InputProps = {
    error?: boolean,
    theme: TTheme,
    value: string,
}

export const Input = styled.input<InputProps>`
    width: 100%;
    height: auto;
    display: block;
    border: none;
    padding: 10px 0;
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    border-bottom: solid 1px ${({ error, theme, value }) => error
    ? theme.palette.error
    : value
        ? theme.palette.primary['30']
        : theme.palette.gray['30']};
    -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 98%, ${({ theme }) => theme.palette.primary['30']} 2%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 98%, ${({ theme }) => theme.palette.primary['30']} 2%);
    background-position: -1000px 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: ${({ error, theme }) => error
    ? theme.palette.error
    : theme.palette.gray['100']
};

    ${Placeholder} {
        font-family: ${({ theme }) => theme.fonts.light};
        font-size: 20px;
        color: ${({ theme }) => theme.palette.gray['50']};
    }
    ${({ value }) => value &&
    `box-shadow: none;
    outline: none;
    background-position: 0 0;
    border-color: ${({ error, theme }) => error
        ? theme.palette.error
        : theme.palette.primary['30']};

    & + ${Placeholder} {
        color: ${({ error, theme }) => error
        ? theme.palette.error
        : theme.palette.primary['30']};
        font-size: 16px;
        transform: translateY(-30px);
        visibility: visible !important;
    }`};
    :focus {
        box-shadow: none;
        outline: none;
        background-position: 0 0;
        border-color: ${({ error, theme }) => error
    ? theme.palette.error
    : theme.palette.primary['30']};

        & + ${Placeholder} {
            color: ${({ error, theme }) => error
    ? theme.palette.error
    : theme.palette.primary['30']};
            font-size: 16px;
            transform: translateY(-30px);
            visibility: visible !important;
        }

    }
    @media (min-width: 1024px){
        font-size: 20px;
        height: 60px;
        :focus{
            & + ${Placeholder} {
                font-size: 16px;
            }
        }
        ${({ value }) => value &&
    `& + ${Placeholder} {
            font-size: 16px;
        }`}
    }
`;

export const Select = styled.select<InputProps>`
    width: 100%;
    display: block;
    border: none;
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.light};
    padding: 10px 0;
    border-bottom: solid 1px ${({ error, theme }) => error
    ? theme.palette.error
    : theme.palette.gray['30']};
    -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 98%, ${({ theme }) => theme.palette.primary['30']} 2%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 98%, ${({ theme }) => theme.palette.primary['30']} 2%);
    background-position: -1000px 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: ${({ error, theme }) => error
    ? theme.palette.error
    : theme.palette.gray['100']
};
    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
    @media (min-width: 1024px){
        height: 95px;
        font-size: 36px;
        top: -73px;
    }
`;

export const ErrorMsg = styled.div`
    margin: -24px 0 34px;
    color: ${({ theme }) => theme.palette.error};
    font-size: 13px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export const CommonErrorMsg = styled(ErrorMsg)`
    margin: 8px 0;
`;
