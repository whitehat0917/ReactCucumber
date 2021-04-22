import styled from 'styled-components';
import Link from 'components/Link';
import { Input } from 'semantic-ui-react';

export const Login = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const InputsWrapper = styled.div`
    width:  20.375rem;
`;

export const TitleWrapper = styled.div`
    margin-bottom: 2rem;
`;

export const OauthButtonWrapper = styled.div`
    margin-bottom: 1rem;
    width: 20.375rem;
`;

export const ResetPasswordLink = styled(Link)`
    position: relative;
    display: block;
    margin: 0 0 3.25rem;
    text-align: right;
    z-index: 999;
`;

export const TextInput = styled.input`
    width: 100%;
    height: 48px;
    margin: 40px 0;
    display: block;
    border: none;
    padding: 10px 0;
    border-bottom: solid 1px ${({ theme }) => theme.palette.primary['30']};
    -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 98%, ${({ theme }) => theme.palette.primary['30']} 2%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 98%, ${({ theme }) => theme.palette.primary['30']} 2%);
    background-position: -400px 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.palette.primary['30']};

    &:focus {
        box-shadow: none;
        outline: none;
        background-position: 0 0;

        &::-webkit-input-placeholder {
            color: ${({ theme }) => theme.palette.primary['30']};
            font-size: 11px;
            -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
            visibility: visible !important;
        }
    }

    &::-webkit-input-placeholder {
        font-family: ${({ theme }) => theme.fonts.light};
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }
`;

const FlexWrapper = styled.div`
    position: relative;
    display: flex;
    width: inherit;
    align-items: center;
`;

// const HideIcon = styled((props) => <Icon clickable size="small" {...props}>eye</Icon>)`
//     position: absolute;
//     right: 1.25rem;
// `;