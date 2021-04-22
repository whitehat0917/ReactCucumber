import styled from 'styled-components';

import Typography from 'components/Typography';
import Link from 'components/Link';

export const Title = styled.h1`
    /* margin: 0 0 36px; */
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 48px;
    color: ${({ theme }) => theme.palette.gray['100']};
    @media (min-width: 1024px) and (max-width: 1439px) {
        font-size: 64px;
        margin: 60px 0 31px 0;
    }
    @media screen and (min-width: 1440px) {
        margin: 36px 0 62px 0;
        font-size: 100px;
    }
`;

export const TitleHolder = styled.div`
    margin: 0 auto 34px;
    max-width: 1244px;
`;

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 24px 0 100px;
    @media (min-width: 1024px) and (max-width: 1439px) {
        margin: 0 0 54px;
    }
    @media screen and (min-width: 1440px) {
        margin: 24px 0 54px;
    }
`;

export const TitleWrapper = styled.section`
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 1240px;

    @media screen and (max-width:1023px) {
        margin: 0 0 12px;
        max-width: 720px;
    }
    @media (min-width: 1024px) and (max-width: 1439px) {
        max-width:905px;
    }
    @media (min-width: 554px) and (max-width: 755px) {
        max-width:514px;
    }
    @media screen and (max-width: 553px) {
        max-width:335px;
    }
`;

export const CollectionsWrapper = styled.section`
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width:1240px;
    align-self:center;

    @media screen and (max-width: 1023px) {
        max-width:720px;
    }
    @media (min-width: 375px) and (max-width: 553px) {
        max-width:335px;
    }
    @media (min-width: 554px) and (max-width: 755px) {
        max-width:514px;
    }
    @media (min-width: 1024px) and (max-width: 1439px) {
        max-width:905px;
    }
`;

export const MobileLinkAndTitleWrapper = styled.div`
    margin-top: 6.25rem;
    padding: 0 1.25rem;
    width: 100%;
    box-sizing: border-box;
`;

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    &:hover {
        cursor: pointer;
    }
`;

export const CollectionLink = styled(Link)`

    @media (min-width: 375px) and (max-width: 1024px) {
       margin: 0 23px 64px 0;
       width: 156px;
    }

    @media (min-width: 375px) and (max-width: 553px) {
        &:nth-child(2n) {
            margin: 0 0 64px 0;
        }
    }

    @media (min-width: 554px) and (max-width: 755px) {
        &:nth-child(3n) {
            margin: 0 0 64px 0;
        }
    }

    @media (min-width: 1024px) and (max-width: 1439px) {
        width: 214px;
        margin: 0 16.22px 43.75px 0;
        &:nth-child(4n) {
            margin: 0 0 43.75px 0;
        }
    }

    @media (min-width: 1440px) {
        margin: 0 22px 60px 0;
        width: 292px;
        &:nth-child(4n) {
            margin: 0 0 60px 0;
        }
    }
    
    @media (max-width: 374px) {
        width: 131.12px;
        margin: 0 17px 64px 0;
        &:nth-child(2n) {
            margin: 0 0 64px 0;
        }
    }
`;


const _gap = (position) => {
    switch(position) {
        case 'top':
            return '0 0 4px';
        case 'bottom':
            return '0';
        case 'topLeft':
            return '0 0 4px 0';
        case 'topRight':
            return '0 0 4px 0';
        case 'bottomLeft':
            return '0';
        case 'bottomRight':
            return '0 0 0 0';
        default:
            return '';
    }
}

export const ArtworksGridWrapper = styled.div`
    display: grid;
    grid-column-gap: 0.25rem;
    grid-row-gap: 0.25rem;
    grid-template-columns: repeat(2, 8.5rem);
    grid-template-rows: repeat(2, 8.5rem);
    border-radius: 0.44rem;

    @media only screen and (max-width: 1400px) { 
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(2, auto);
    }

    div:nth-child(1) > div > img {
        border-radius: 0.44rem 0 0 0;
    }

    div:nth-child(2) > div > img {
        border-radius: 0 0.44rem 0 0;
    }

    div:nth-child(3) > div > img {
        border-radius: 0 0 0 0.44rem;
    }

    div:nth-child(4) > div > img {
        border-radius: 0 0 0.44rem 0;
    }
`;

export const ArtworkWrapper = styled.div`
    --desktop-image-size: calc((75rem - 7.9375rem) / 8);

    box-sizing: border-box;

    img {
        width: 100%;
        height: var(--desktop-image-size);
        object-fit: cover;

        @media screen and (min-width: 1024px) { 
            --tablet-image-size: calc((100vw - 17.625rem) / 6);
            
            width: 100%;
            height: var(--tablet-image-size);
        }

        @media screen and (max-width: 1024px) { 
            --mobile-image-size: calc((100vw - 4.25rem) / 4);

            width: 100%;
            height: var(--mobile-image-size);
        }
    }
`;

export const StyledTypography = styled(Typography)`
    margin: 17px 0 4px;
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 24px;
    font-weight: 300;
    color: ${({ theme }) => theme.palette.gray['100']};
    
    @media screen and (min-width: 1024px) {
        font-size: 24px;
        margin: 12px 0 0;
    }
    @media screen and (min-width: 1440px) {
        font-size: 36px;
        margin: 21px 0 14px;
    }

    @media screen and (max-width: 1023px) {
        font-family: ${({ theme }) => theme.fonts.medium};
        font-weight: 500;
    }
`;

export const ArtworkContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0 0 8px;

    max-width: 131.12px;
    max-height: 131.12px;
    min-width: 131.12px;
    min-height: 131.12px;
    @media screen and (min-width: 375px) {
        max-width: 156px;
        max-height: 156px;
        min-width: 156px;
        min-height: 156px;
    }

    @media screen and (min-width: 1024px) {
        max-width: 214px;
        max-height: 214px;
        min-width: 214px;
        min-height: 214px;
    }

    @media screen and (min-width: 1440px) {
        max-width: 296px;
        max-height: 296px;
        min-width: 296px;
        min-height: 296px;
    }
`;

export const ArtWorkCard = styled.div`
    --desktop-image-size: ${({ position }) => 
        position === '100%' 
            ? `calc(17.5rem)` 
            : `calc(17.5rem / 2)` };

    /* height: var(--desktop-image-size); */
    object-fit: cover;
    /* height: calc(100% / 2); */

    display: block;
    object-fit: cover;
    /* max-height: 76px; */
    /* max-width: 76px; */
    /* height: 76px; */
    width: ${({ width }) => `${width}`};
    margin: ${({ position }) => _gap(position)};
    overflow: hidden;
    @media screen and (min-width: 1024px){
        width: ${({ width }) => width === '48%' ? '49.325%' : width};
    }
`;

export const ImageContainer = styled.div`
    position: relative;
`;

export const Image = styled.div`
    width: 100%;
    height: 100%;
    display: block !important;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    background-image: ${({ src }) => `url(${src})`};
`;

export const ArtworksAmount = styled.div`
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 16px;
    color: ${({ theme }) => theme.palette.gray['50']};
    @media (min-width: 1024px) and (max-width: 1439px) {
        font-size: 13.1253px;
    }
`;

export const EmptyPlaceholder = styled.div`
    opacity: 0.5;
`;
