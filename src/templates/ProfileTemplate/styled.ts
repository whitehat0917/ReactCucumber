import Button from 'components/Button';
import LayoutContainer from 'components/LayoutContainer';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TTheme } from '../../theme';

export const ArtistHomeLink = styled(Link)`
  text-decoration: none;
`;

type THeaderWrapper = {
  theme: TTheme;
};

export const HeaderWrapper = styled.div<THeaderWrapper>`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.white};
  box-sizing: border-box;
  /* border-bottom: 1px solid ${({ theme }) => theme.palette.gray['45']}; */
  /* animation: ${({ hideView, theme }: THeaderWrapper) =>
    hideView
      ? theme.animations.slideUp
      : theme.animations.slideDown} .5s forwards cubic-bezier(0.39, 0.575, 0.565, 1); */
  z-index: 2;

  padding: 20px;

  @media screen and (min-width: 769px) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray['45']};
  }
`;

type TMainAndButtonsWrapper = {
  isDesktop: boolean;
  theme: TTheme;
};

export const MainAndButtonsWrapper = styled.div<TMainAndButtonsWrapper>`
  display: ${({ isDesktop }) => (isDesktop ? 'flex' : 'block')};
  position: relative;
  padding: 21px 0;

  @media screen and (min-width: 769px) {
    padding: 21px 0;
    height: 76px;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export const NameAndBioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  width: 100%;
  margin-top: 0;
`;

export const ContactButtonWrapper = styled.div`
  margin-top: 1.25rem;
`;

export const ContactButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  top: 1rem;
  right: 0;
  position: absolute;

  :hover {
    cursor: pointer !important;
  }
`;

// export const Link = styled.a`
//     text-decoration: none;
// `;

export const FooterTitle = styled.h3`
  margin: 0 0 36px;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 24px;
  font-weight: 500;
`;

export const FooterContent = styled(LayoutContainer)`
  position: relative;
  margin: 0 auto;
  padding: 48px 20px;
  max-width: 1240px;
  min-width: 280px;
  width: 100%;
  border-top: 1px solid ${({ borderColor }) => borderColor};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.appBackground};
`;

export const FooterColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 0 60px;
  width: 50%;
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 48px 0;
  width: 100%;
`;

export const FooterLink = styled(NavLink)`
  flex: auto;
  margin: 0 0 20px;
  font-family: ${({ theme }) => theme.fonts.light};
  font-weight: 300;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.gray[100]};
  text-decoration: none;

  ${({ isActive, theme }) =>
    isActive
      ? `
        cursor: pointer;
        color: ${theme.palette.primary[30]}};
    `
      : ''}

  :hover {
    cursor: pointer;
  }

  :last-child {
    margin: 0;
  }
`;

export const FooterSocialLink = styled.a`
  flex: auto;
  margin: 0 0 20px;
  font-family: ${({ theme }) => theme.fonts.light};
  font-weight: 300;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.gray[100]};
  text-decoration: none;

  ${({ isActive, theme }) =>
    isActive
      ? `
        cursor: pointer;
        color: ${theme.palette.primary[30]}};
    `
      : ''}

  :hover {
    cursor: pointer;
  }

  :last-child {
    margin: 0;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ color }) => color};
`;

export const PrivacyPolicy = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  order: 3;
  padding: 58px 0 0;
  width: 100%;

  @media screen and (min-width: 769px) {
    order: 2;
    justify-content: flex-start;
    padding: 0;
    width: 80%;
  }
`;

export const PrivacyPolicyLink = styled.a`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.footer};
  text-decoration: none;

  @media screen and (min-width: 769px) {
    margin: 0 28px 0 0;
  }
`;

export const FooterBottomHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 48px 0 0;
  width: 100%;
  justify-content: space-between;

  @media screen and (min-width: 769px) {
    justify-content: flex-start;
  }
`;

export const LinkHolder = styled.div`
  position: relative;
  display: flex;
  width: 50%;

  &:nth-child(2) {
    width: auto;
  }

  @media screen and (min-width: 991px) {
    &:nth-child(1) {
      justify-content: flex-start;
      order: 1;
      width: 10%;
    }
  }

  @media screen and (min-width: 769px) {
    &:nth-child(1) {
      justify-content: flex-start;
      order: 1;
      width: 8%;
    }

    &:nth-child(2) {
      justify-content: flex-end;
      order: 3;
      position: absolute;
      right: 18px;
    }
  }
`;

export const TopHolder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media screen and (min-width: 769px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ColumnHolder = styled.div`
  display: flex;
  transition: all 0.3s;
  /* flex-direction: column; */

  ${FooterColumn} {
    margin: 0 120px 60px 0;
    font-family: ${({ theme }) => theme.fonts.heavy};
    font-size: 36px;
    font-weight: 800;
  }
`;

export const LogoutLink = styled.span`
  color: ${({ theme }) => theme.palette.primary['30']};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 24px;
  cursor: pointer;
`;

export const DIVIDER_COLOR = '#D5D5D5';
