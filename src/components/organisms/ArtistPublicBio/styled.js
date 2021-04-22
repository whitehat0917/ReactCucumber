import styled from 'styled-components';

export const AboutTitle = styled.h2`
    padding: 0 0 36px;
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 64px;
    font-weight: 800;
    line-height: 1;
    color: ${({ theme }) => theme.palette.gray['100']}
`;

export const FeaturedTitle = styled.h2`
    padding: 0 0 28px;
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 36px;
    font-weight: 800;
    line-height: 1;
    color: ${({ theme }) => theme.palette.gray['100']}
`;

export const AboutImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
`;

export const AboutBio = styled.p`
    padding: 0 0 48px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 34px;
    line-height: 44px;
    color: ${({ theme }) => theme.palette.gray['100']}
`;

export const Wrapper = styled.section`
  padding-top: 3.625rem;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;

  @media only screen and (max-width: 991px) { 
    padding-top: 0rem;
    flex-direction: column;
  }
`;

export const DescriptionWrapper = styled.section`
    padding-left: 30rem;
    margin-right: 8rem;
    /*margin-bottom: 6.3125rem;*/
    width: 100%;
    box-sizing: border-box;

    @media only screen and (max-width: 991px) { 
        padding: 60px 20px 0;
        margin-right: 0;
    }
`;

export const FeaturedLinksWrapper = styled.div`
  padding-right: 1rem;
  margin: 0 0 100px;

  @media only screen and (max-width: 991px) {
    margin-top: 1.5rem;
    padding-right: 0;
  }
`;
