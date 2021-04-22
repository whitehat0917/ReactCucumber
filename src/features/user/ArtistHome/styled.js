import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export const HomeContentHolder = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto 118px;
  padding: 60px 0 0;

  @media screen and (min-width: 1240px) {
    padding: 60px 0 0;
  }
`;

export const TopContentHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 100px;

  @media screen and (min-width: 678px) {
    justify-content: space-between;
  }

  @media screen and (min-width: 678px) and (max-width: 1240px) {
    padding: 0 20px;
  }
`;

export const IntroHolder = styled.div`
  margin: 0 0 38px;

  @media screen and (min-width: 769px) {
    margin: 0 0 64px;
  }
`;

export const IntroText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 24px;
  color: ${({ theme }) => theme.palette.gray['100']};
`;

export const ArtistHomeHolder = styled.div`
  order: 2;
  padding: 36px 20px 0;
  margin-right: 0;
  width: 100%;
  transition: width 0.3s;

  @media screen and (min-width: 769px) {
    order: 1;
    padding: 36px 0 0;
    width: 44%;
  }
`;

export const ArtistImageHolder = styled.div`
  order: 1;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  /* transition: width .3s; */

  @media screen and (min-width: 769px) {
    order: 2;
    width: 49%;
  }
`;

export const ArtistHomeImage = styled.div`
  height: 60vh;
  overflow: hidden;
  /* position: absolute; */
`;

export const MainImageDiv = styled.div`
  background-image: ${({ image }) => `url(${image.thumbnails.mid})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
`;
export const MainImage = styled.img`
  height: 100%;
  width: 100%;
  image-orientation: from-image;
  object-fit: cover;
`;

export const CollectionsHolder = styled.div`
  order: 3;
  padding: 0 20px;
  /* margin: 5.1875rem 0; */
  min-width: 375px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media screen and (min-width: 1240px) {
    padding: 0;
  }

  @media screen and (max-width: 991px) {
    margin: 0.625rem 0;
  }
`;

export const ArtistHomeTitle = styled.h2`
  margin: 0 0 24px;
  padding: 0 20px;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 48px;
  color: ${({ theme }) => theme.palette.gray['100']};
`;

export const SocialLinksHolder = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 0 60px; */
`;

export const ArtistSocialLink = styled.a`
  :root {
    --card-padding: 24px;
    --card-height: 340px;
  }

  display: flex;
  margin: 0 0 26px;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary['30']};
  background-image: ${({ isLoading, theme }) => {
    return isLoading ? `linear-gradient(lightgrey 320px, transparent 0);` : 'none';
  }};
  background-repeat: no-repeat;
  animation: loading 1.5s infinite;
  text-decoration: none;

  @keyframes loading {
    to {
      background-position: 350% 0, 0 0;
    }
  }

  &:last-child {
    margin: 0;
  }
  @media screen and (min-width: 1024px) {
    font-size: 24px;
  }
`;

export const FullBioLink = styled(Link)`
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 20px;
  color: ${({ theme }) => theme.palette.primary['30']};
  text-decoration: none;
`;

export const SocialIcon = styled(Icon)`
  margin: 0 20px 0 0 !important;
`;

export const ArrowContainer = styled.div`
  width: 36px;
  display: flex;
  margin: 0 13px 0 9px;
  align-items: center;
`;

export const Skeleton = styled.div`
  background-repeat: no-repeat;
  background-image: 
    /* layer 2: avatar */
    /* white circle with 16px radius */ radial-gradient(
      circle 16px,
      white 99%,
      transparent 0
    ),
    /* layer 1: title */ /* white rectangle with 40px height */ linear-gradient(white 40px, transparent 0),
    /* layer 0: card bg */ /* gray rectangle that covers whole element */ linear-gradient(gray 100%, transparent 0);
`;
