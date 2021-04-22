import styled from 'styled-components';

export const ContentHolder = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto 108px;

  @media screen and (min-width: 678px) {
    padding: 0 20px;
  }

  @media screen and (min-width: 1024px) {
    justify-content: flex-start;
    margin: 0 auto 148px;
  }
`;

export const AboutTitle = styled.h2`
    padding: 0 0 30px;
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 64px;
    font-weight: 800;
    line-height: 1;
    color: ${({ theme }) => theme.palette.gray['100']};
    @media screen and (min-width: 1024px) {
        font-size: 100px;
    }
`;

export const FeaturedTitle = styled.h2`
    padding: 0 0 28px;
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 36px;
    font-weight: 800;
    line-height: 1;
    color: ${({ theme }) => theme.palette.gray['100']};
    transition: font-size .3s;

    @media screen and (min-width: 1024px) {
        font-size: 48px;
    }
`;

export const ImageHolder = styled.div`
    max-width: 498px;
    width: 100%;
    margin: 0 0 39px;
    transition: width .3s;
    overflow: hidden;
    @media screen and (min-width: 678px) {
      width: 498px;
    }

    @media screen and (min-width: 1024px) {
      margin: 0 132px 0 0;
    }
`;

export const AboutImage = styled.img`
    width: 100%;
    height: 600px;
    object-fit: cover;
    @media (min-width: 678px) {
      height: 632px;
    }
`;

export const AboutBio = styled.p`
    margin: 0;
    padding: 0 0 48px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 34px;
    line-height: 44px;
    color: ${({ theme }) => theme.palette.gray['100']};
    @media (min-width: 1024px){
      width: 74%;
    }
`;

export const Wrapper = styled.section`
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
    /* padding-left: 30rem;
    margin-right: 8rem; */
    /*margin-bottom: 6.3125rem;*/
    padding: 54px 20px 0;
    width: 100%;
    box-sizing: border-box;

    @media screen and (min-width: 679px) {
      padding: 60px 0 0;
      margin-right: 0;
    }
`;

export const ContentBioHolder = styled.div`
  ${DescriptionWrapper};
  max-width: 505px;
  width: 100%;
  padding: 0 20px;
  /* transition: width .3s; */

  @media screen and (min-width: 678px) {
      padding: 0;
      width: 40%;
  }
`;

export const FeaturedLinksWrapper = styled.div`
  /* padding-right: 1rem; */
  /* margin: 0 0 100px; */

  padding: 60px 0 0;

  /* @media only screen and (max-width: 991px) {
    margin-top: 1.5rem;
    padding-right: 0;
  } */
`;

export const LinkHolder = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 26px;
  text-decoration: none;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const LinkTextWrapper = styled.div`
  flex: auto;
`;

export const IntroBio = styled.div`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 24px;
    line-height: 36px;
    color: ${({ theme }) => theme.palette.gray['100']};
`;
