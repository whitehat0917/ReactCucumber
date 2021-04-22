import styled from 'styled-components';

const letterSpacingChooser = ({ type, letterSpacing }) => {
  if (letterSpacing) return letterSpacing;

  switch (type.toLowerCase()) {
    case 'h1':
      return '0.01rem';
    case 'body1':
    case 'body2':
    case 'body3': {
      return '0.005rem';
    }
    default: {
      return 'normal';
    }
  }
};

const lineHeightChooser = ({ type, lineHeight }) => {
  if (lineHeight) return lineHeight;
  switch (type.toLowerCase()) {
    case 'h1': {
      return '7rem';
    }
    case 'h2':
    case 'h3': {
      return 'normal';
    }
    case 'h4': {
      return '3.125rem';
    }
    case 'body1':
    case 'subtitle1': {
      return '2.5rem';
    }
    case 'subtitle2': {
      return '1.8125rem';
    }
    case 'body2': {
      return '2rem';
    }
    case 'body3': {
      return '1.75rem';
    }
    case 'caption': {
      return '1.375rem';
    }
    case 'small': {
      return '1.25rem';
    }
    default: {
      return '1.6875rem';
    }
  }
};

const fontWeightChooser = ({ type, weight }) => {
  if (weight) return weight;
  return 'normal';
};

const fontSizeChooser = ({ type, fontSize }) => {
  if (fontSize) return fontSize;
  switch (type.toLowerCase()) {
    case 'h1':
      return '5rem';
    case 'h2':
      return '3.375rem';
    case 'h3':
      return '2.75rem';
    case 'h4':
      return '1.875rem';
    case 'subtitle1':
      return '1.25rem';
    case 'subtitle2':
      return '1rem';
    case 'body1':
      return '1.5rem';
    case 'body2':
      return '1.25rem';
    case 'body3':
      return '1rem';
    case 'small':
      return '0.875rem';
    case 'caption':
      return '0.6875rem';
    default: {
      return '1rem';
    }
  }
};

const colorChooser = ({ color, theme }) => {
  if (!color) return theme.palette.gray[100];
  switch (color.toLowerCase()) {
    case 'primary':
      return theme.palette.primary[30];
    case 'muted':
      return theme.palette.gray[30];
    case 'subtitle':
      return theme.palette.gray[60];
    case 'error':
      return theme.palette.error;
    case 'success':
      return theme.palette.success;
    case 'white':
      return theme.palette.white;
    case 'default':
      return theme.palette.gray[100];
    default: {
      return color;
    }
  }
};

const wrapChooser = ({ noWrap }) => (noWrap ? 'nowrap' : 'normal');

const fontFamilyChooser = ({ fontFamily, type, theme }) => {
  if (fontFamily === 'secondary') return theme.fonts.bold;
  switch (type.toLowerCase()) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'subtitle1':
    case 'subtitle2': {
      return theme.fonts.heavy;
    }
    default: {
      return theme.fonts.primary;
    }
  }
};
export interface TypographyProps {
  fontFamily?: 'default' | 'secondary';
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'body3' | 'small' | 'caption';
  letterSpacing?: string;
  lineHeight?: string;
  fontSize?: string;
  weight?: string;
  color?: string;
  centered?: boolean;
  iswrap?: boolean;
  noWrap?: boolean;
}
const Typography = styled.p<TypographyProps>(
  (props) => `
  font-family: ${fontFamilyChooser(props as any)};
  font-size: ${fontSizeChooser(props as any)};
  font-weight: ${fontWeightChooser(props as any)};
  font-style: normal;
  line-height: ${lineHeightChooser(props as any)};
  letter-spacing: ${letterSpacingChooser(props as any)};
  color: ${colorChooser(props as any)};
  margin: 0;
  text-align: ${props.centered ? 'center' : 'inherit'};
  white-space: ${wrapChooser(props as any)};
`,
);

Typography.defaultProps = {
  type: 'body3',
  color: 'default',
  fontFamily: 'default',
};

export default Typography;
