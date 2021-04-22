import styled from 'styled-components';

export const TitleHolder = styled.div`
  margin: 0 0 60px;
  @media (min-width: 1024px) {
    margin: 0 0 60px;
  }
`;

export const ContactTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  color: ${({ theme }) => theme.palette.gray['100']};
  margin: 0px;
  @media screen and (min-width: 1024px) {
    font-size: 100px;
  }
`;

export const SocialTitle = styled.h2`
  padding: 0 0 36px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: ${({ theme }) => theme.palette.gray['100']};
  margin: 0px;
  @media screen and (min-width: 1024px) {
    font-size: 48px;
  }
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

export const ButtonWrapper = styled.div`
  width: 335px;
  margin: 0 0 80px;

  @media screen and (min-width: 1024px) {
    width: 295px;
    margin: 0 0 121px;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 44px;

  @media screen and (min-width: 1024px) {
    margin: 0 0 60px;
  }
`;

export const ContactForm = styled.form`
  /* padding-left: 30rem; */
  /* margin-right: 8rem; */
  /*margin-bottom: 6.3125rem;*/
  max-width: 820px;
  width: 100%;
  margin: 54px auto 0;

  @media only screen and (max-width: 991px) {
    margin: 60px auto 0;
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

export const SocialLinksHolder = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 102px;
  @media screen and (min-width: 1024px) {
    margin: 0 0 144px;
  }
`;

export const SocialLink = styled.a`
  display: flex;
  margin: 0 0 26px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary['30']};
  text-decoration: none;

  &:last-child {
    margin: 0;
  }
`;

export const ArtistImageContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const ArtistSmallImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 5%;
  object-fit: cover;
`;

export const AttachArtworkContainer = styled.div`
  margin-left: 2rem;
  padding-top: 0.5rem;
`;

export const AttachArtworkDescription = styled.div`
  color: ${({ theme }) => theme.palette.gray['60']};
`;
export const AttachArtworkTitle = styled.div`
  text-overflow: ellipsis;
`;
