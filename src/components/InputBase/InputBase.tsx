import { css } from 'styled-components';

const borderColorChooser = (state) => ({ error, theme }) => {
  if (error) return theme.palette.error;
  switch (state) {
    case 'hover': return theme.palette.gray[50];
    case 'active': return theme.palette.primary[30];
    case 'default':
    default: return theme.palette.gray[30];
  }
};

const borderChooser = (state) => ({ disabled, error, theme }) => {
  if (disabled) return 'none';
  return error ? `2px solid ${borderColorChooser()({ error, theme })}`
    : `1px solid ${borderColorChooser(state)({ theme })}`;
};

const InputText = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-style: normal;
  font-weight: normal;
  line-height: 1.6875rem;
  font-size: 1rem;
  letter-spacing: 0.01rem;
  padding: 0 1rem;
  color: ${({ theme, error }) => (error ? theme.palette.error : theme.palette.gray[100])};
`;

const InputWrapper = css`
  width: 100%;
  height: 3rem;
  outline: 0;
  display: block;
  background: ${({ disabled, theme }) => (disabled ? theme.palette.gray[20] : theme.palette.white)};
  border: ${borderChooser('default')};
  box-sizing: border-box;
  border-radius: 0.4375rem;

  ${({ focused, ...props }) => (!focused ? `
    &:hover {
      border: ${borderChooser('hover')(props)};
    }
  ` : '')}


  ${({
    focused, disabled, error, ...props
  }) => (focused ? `
    border-color: ${borderColorChooser('active')({ error, ...props })};
    box-shadow: ${(disabled || error) ? 'none' : '0 0 0.625rem rgba(249, 110, 48, 0.3)'};` : '')}


  &:active, :focus {
    border-color: ${borderColorChooser('active')};
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 0 0.625rem rgba(249, 110, 48, 0.3)')};
  }
`;

export default {
  wrapper: InputWrapper,
  text: InputText,
};
