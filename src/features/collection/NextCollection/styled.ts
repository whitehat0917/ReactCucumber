import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const NextCollectionWrapper = styled.div`
    @media (min-width:441px) {
        display: flex;
        height: 100%;
    }
    
`;

export const Holder = styled.div`
    display: flex;
    flex-direction: column;
`;

export const NextCollectionHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 100px;
    @media (min-width:441px) {
        
        /* height: 668px; */
        background-color: ${({ theme }) => theme.palette.greyBackground};
    }
`;

export const NextCollectionNavLink = styled(Link)`
    text-decoration: none;
    text-align: center;

    @media (min-width: 1160px) {
        margin: 0 auto;
        max-width: 1240px;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        width: 86.111111111%;
        /* height: 468px; */
        flex-wrap: wrap;
    }
`;

export const NextCollectionButton = styled.div`
    display: none;

    @media (min-width: 1160px) {
        display: flex;
        width: 56px;
        height:56px;
        background-color: ${({ theme }) => theme.palette.primary['30']};
        padding: 10px;
        font-family: ${({ theme }) => theme.fonts.medium};
        font-size: 20px;
        color: ${({ theme }) => theme.palette.white};
        text-decoration: none;
    }
`;

export const NextCollectionLink = styled.div`
    margin: 0 0 18px;
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 18px;
    color: ${({ theme }) => theme.palette.primary['30']};

    @media (min-width: 1160px) {
        display: flex;
        margin: 144px 0 12px;
    }
`;

export const NextCollectionTitle = styled.div`
    margin: 0 0 36px;
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 36px;
    color: ${({ theme }) => theme.palette.gray['100']};
    line-height: 1;
    text-align: center;

    @media (min-width: 1160px) {
        font-size: 48px;
        display: flex;
    }
`;

export const NextCollectionDivider = styled.div`
    margin: 0 0 36px;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.gray['30']};

    @media (min-width: 769px) {
        display:none;
    }
`;

export const NextCollectionImageHolder = styled.div`
    max-width: 335px;
    max-height: 220px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all .3s;
    /* @media (min-width: 441px) {
        align-self: flex-end;
        width: 57.661290322%;
    } */

    @media (min-width: 769px) {
        max-width: 715px;
        max-height: 468px;
    } 
`;

export const NextCollectionImage = styled.img`
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;

    @media (min-width:441px) {
        width: 100%;
        height: 100%;
    }
`;