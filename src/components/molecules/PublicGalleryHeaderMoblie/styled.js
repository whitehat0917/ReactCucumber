import Button from 'atoms/Button';
import styled from 'styled-components';

export const UserName = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 20px;
  font-style: normal;
  color: ${({ theme }) => theme.palette.gray['100']};
`;

export const HeaderWrapper = styled.div`
  background: ${({ theme }) => theme.palette.white};
  z-index: 2;
  box-sizing: border-box;
  animation: ${({ hideView, theme }) => (hideView ? theme.animations.slideUp : theme.animations.slideDown)} 0.5s
    forwards cubic-bezier(0.39, 0.575, 0.565, 1);
`;

export const MainAndButtonsWrapper = styled.div`
  position: relative;
  padding: 1.25rem;
  width: 100%;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  right: 1.145rem;
  position: absolute;

  :hover {
    cursor: pointer !important;
  }
`;
