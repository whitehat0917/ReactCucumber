import styled, { keyframes, css } from "styled-components";
import {NavLink} from "react-router-dom";

import { TTheme } from 'theme';

import { ThemedProps } from "../../purchase/styled";

export const ProductsHolder = styled.div`
    max-width: 1240px;
    width: 100%;
    margin: 0 auto 80px;
`;

export const GridWrapper = styled.div`
    max-width: 1240px;
    margin: 0 auto;
    box-sizing: border-box;
`;

export const SkeletonWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const CardWrapper = styled.div`
    padding: 0 12px 12px 0;
    width: 300px;

    @media (max-width: 970px) {
        width: 250px;
    }
    
    @media (max-width: 825px) {
        width: 200px;
    }
    
    @media (max-width: 664px) {
        width: 250px;
    }
    
    @media (max-width: 538px) {
        width: 140px;
    }}
`;

export const ProductCardContainer = styled(NavLink)`
    display: block;
    cursor: pointer;
    text-decoration: none;
`;

export const ProductImageWrapper = styled.div`
    position: relative;
`;

export const SoldOutSign = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    
    width: 80px;
    height: 80px;
    border-radius: 40px;

    background: #121212;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SoldOutText = styled.div<ThemedProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    
    text-align: center;
    
    color: #FFFFFF;
`;

export const ProductPriceWrapper = styled.div`
    padding-top: 8px;
`;

export const ProductName = styled.div<ThemedProps>`
    color: ${({theme}) => theme.palette.black};
    font-family: ${({ theme }) => theme.fonts.light};
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    
    @media (max-width: 992px) {
        font-size: 16px;
        line-height: 24px;
    }
`;

export const ProductPrice = styled.div<ThemedProps>`
    color: ${({theme}) => theme.palette.black};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-style: normal;
    font-weight: medium;
    font-size: 20px;
    line-height: 32px;
    
    @media (max-width: 992px) {
        font-size: 18px;
        line-height: 28px;
    }
`;

export const EmptyPlaceholder = styled.div`
    opacity: 0.5;
`;

const appear = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const appearMixin = css`
    animation: ${appear} 1s linear 1;
`;

export const ProductCardBody = styled(ProductCardContainer)`
    width: 300px;
    
    ${({ isNew }) => isNew ? appearMixin : ''}
    
    @media (max-width: 970px) {
        width: 250px;
    }
    
    @media (max-width: 825px) {
        width: 200px;
    }
    
    @media (max-width: 664px) {
        width: 250px;
    }
    
    @media (max-width: 538px) {
        width: 140px;
    }
`;

export type ProductCardImageProps = {
    image: string;
    aspect: number;
};

export const ProductCardImage = styled.div<ProductCardImageProps>`
    background-image: url(${props => props.image});
    background-size: cover;
    
    width: 300px;
    height: ${props => 300 / props.aspect}px;
    
    @media (max-width: 970px) {
        width: 250px;
        height: ${props => 250 / props.aspect}px;
    }
    
    @media (max-width: 825px) {
        width: 200px;
        height: ${props => 200 / props.aspect}px;
    }
    
    @media (max-width: 664px) {
        width: 250px;
        height: ${props => 250 / props.aspect}px;
    }
    
    @media (max-width: 538px) {
        width: 140px;
        height: ${props => 140 / props.aspect}px;
    }
`;
