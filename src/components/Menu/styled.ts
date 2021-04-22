import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

type TMenuWrapper = {
  isOpen: boolean;
  isDesktop: boolean;
};

type TMenuLink = {
  isDesktop: boolean;
};

export const MenuLink = styled(NavLink)<TMenuLink>`
  position: relative;
  top: -8px;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${({ isDesktop }) => (isDesktop ? '18px' : '48px')};
  color: ${({ theme }) => theme.palette.black};
  text-decoration: none;
  line-height: 60px;

  /*transition*/
  -webkit-transition: width 0.3s, right 0.3s;
  -moz-transition: width 0.3s, right 0.3s;
  -o-transition: width 0.3s, right 0.3s;
  transition: width 0.3s, right 0.3s;

  &:hover {
    color: ${({ theme }) => theme.palette.primary['30']};
  }

  &.active {
    color: ${({ theme }) => theme.palette.primary['30']};

    @media screen and (min-width: 1024px) {
      font-family: ${({ theme }) => theme.fonts.medium};
      font-weight: 500;

      &.active {
        &::after {
          content: '';
          position: absolute;
          top: 43px;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: ${({ theme }) => theme.palette.primary['30']};
        }
      }
    }
  }
`;

export const MenuLi = styled.li`
  position: relative;
  margin: 0 0 28px;

  @media screen and (min-width: 1024px) {
    margin: 0 46px 0 0;
    line-height: 28px;

    &:last-child {
      margin: 0;
    }
  }

  &:nth-child(4) {
    margin: 0 0 60px;
  }
`;

export const MenuWrapper = styled.ul<TMenuWrapper>`
  position: ${({ isDesktop }) => (isDesktop ? 'relative' : 'fixed')};
  left: 0;
  display: ${({ isOpen, isDesktop }) => (isOpen && !isDesktop ? 'flex' : isDesktop ? 'flex' : 'none')};

  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  justify-content: ${({ isDesktop }) => (isDesktop ? 'flex-end' : 'none')};
  padding: ${({ isDesktop }) => (isDesktop ? '0' : '0 40px')};
  align-items: flex-start;
  max-height: 100%;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.appBackground};
  overflow: hidden;
  list-style-type: none;

  @media screen and (min-width: 1024px) {
    max-height: none;
    height: 55px;
  }
`;

export const LinkHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 0 40px;
  width: 270px;
`;

export const MenuSocialLink = styled.a`
  display: block;
  margin: 0 0 16px;
  width: 50%;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.gray['100']};
  text-decoration: none;
`;

export const MenuText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.gray['60']};

  span {
    color: ${({ theme }) => theme.palette.primary['30']};
  }
`;

export const MenuBurgerIcon = styled.div`
  width: 27px;
  height: 18px;
  position: relative;
  margin: 11px auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #121212;
    border-radius: 4px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 8px;
    }

    &:nth-child(4) {
      top: 16px;
    }
  }

  &.open {
    span {
      &:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
      }

      &:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      &:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }

      &:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
    }
  }
`;
