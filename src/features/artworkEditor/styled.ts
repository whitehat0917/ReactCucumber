import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { TTheme } from 'theme';
import Typography from 'components/Typography';

export const ContentHolder = styled.div`
    display: flex;
`;

export const FormWrapper = styled.div`
  flex: 1 1 33%;
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

export const ImagesWrapper = styled.div`
  flex: 1 1 66%;
  min-width: 25rem;
`;

export const EditForm = styled.form`

`; 

export const FormRow = styled.div`
    display: flex;
    margin: 0.6rem 0 1.25rem;
`;

export const FieldWrapper = styled.div`
    flex-basis: ${({ basis }) => basis || 'auto'};
    margin-left: ${({ marginLeft }) => marginLeft || '0'};
    margin-right: ${({ marginRight }) => marginRight || '0'};
`;

export const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 0.6rem;
    height: 100%;
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 3.5rem 0 4rem;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    margin-left: auto;
    `;

export const ButtonWrapper = styled.div`
    margin-right: 0.75rem;
`;

type ContainerProps = {
    width: string
    theme: TTheme
};

export const ImageContainer = styled.div<ContainerProps>`
  position: relative;
  display: inline-block;
  padding: 0 0.75rem 0.75rem 0;
  margin: 1rem;
  width: ${({ width }) => width}px;
  box-sizing: border-box;
`;

export const Image = styled.img`
  width: 100%;
  display: flex;
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: 0px 1px 4px rgba(22, 22, 42, 0.15);
  border-radius: 0.25rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const DeleteLink = styled(Typography)`
  margin-top: 3rem;
  cursor: pointer;
  display: inline-block;
  color: ${({ theme }) => theme.palette.red};
`;

export const UploadButton = styled(NavLink)`
  background-color: ${({ theme }) => theme.palette.gray[20]};
`;