import styled from 'styled-components';
import Typography from 'atoms/Typography';


export const Wrapper = styled.section`
    width: 100%;
    /*height: ${({ activeImageHeight }) => `calc(100vh - ${activeImageHeight}px)`};*/
    background: ${({ theme }) => theme.palette.white};
    border-radius: 0.75rem 0.75rem 0 0;
    z-index: 1;
    padding-bottom: 3rem;
    position: fixed;
    bottom: 0;
    left: 0;
    transform: ${({ isFullScreen }) => (isFullScreen ? 'translateY(100%)' : 'translateY(0)' )};
    transition: transform .3s;
`;

export const MainWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    /*border-bottom: 1px solid ${({ theme }) => theme.palette.gray[25]};*/
`;

export const TitleWrapper = styled.div`
    width: 60%;
    font-weight: 800;
`;

export const MetaDataWrapper = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

export const StyledTypography = styled(Typography)`
    margin-top: 0.8rem;
    font-size: 17px;
    line-height: 1.5;
`;

export const Status = styled(Typography)`
    margin-top: 0.8rem;
    font-weight: 600;
    font-size: 17px;
    line-height: 1.5;
`;

export const MetaDataRight = styled.div`
    width: 58%;
`;

export const MetaDataLeft = styled.div``;

export const ArtistProfileWrapper = styled.div`
    display: flex;
    padding: 0.929rem 1.25rem;

    &:hover {
        cursor: pointer;
    }
`;

export const ArtistNameWrapper = styled.div`
    margin-left: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: auto;
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const ContactButtonWrapper = styled.div`
    padding: 0 1.25rem 1rem 1.25rem;
`;

export const CloseIconWrapper = styled.span`
    position: absolute;
    top: 24px;
    right: 24px;

    &:hover {
        cursor: pointer;
    }
`;

export const ICON_COLOR = '#919191';