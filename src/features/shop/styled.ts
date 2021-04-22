import styled from 'styled-components';

export const TitleWrapper = styled.section`
    width: 100%;
    max-width: 1240px;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    margin-bottom: 60px;
    box-sizing: border-box;
    
    @media (max-width: 679px) {
        margin-top: 0;
        margin-bottom: 36px;
    }
`;

export const Title = styled.h1`
    margin: 0 0 16px;
    
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-style: normal;
    font-weight: 800;
    font-size: 64px;
    line-height: 64px;
    
    letter-spacing: -0.02em;
    
    color: ${({ theme }) => theme.palette.gray['100']};

    @media (max-width: 679px){
        font-size: 48px;
        line-height: 60px;
    }
`;
