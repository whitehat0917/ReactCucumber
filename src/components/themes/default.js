import { reversePalette } from 'styled-theme/composer';
import { keyframes } from 'styled-components';

const theme = {};

theme.palette = {
  gray: {
    10: '#F9F9F9',
    20: '#E6EAED',
    25: '#E0E4E7',
    26: '#DFE3E6',
    27: '#D7DBDE',
    30: '#C9CBCC',
    50: '#B1B2B2',
    80: '#5E5960',
    100: '#1A181B',
  },
  primary: {
    30: '#FF5B00',
    50: '#F86A28',
    100: '#F63C26',
  },
  gradient: {
    from: '#FF7E01',
    to: '#FF5001',
  },
  white: '#FFFFFF',
  red: '#FF0000',
  error: '#E52208',
  success: '#00A878',
  divider: '#D5D5D5',
  footer: '#919191',
  menuIcon: '#121212',
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: 'NeueHaasUnica, Open Sans, sans-serif',
  primaryHeavy: 'NeueHaasUnicaHeavy, Open Sans, sans-serif',
  secondary: 'Open Sans, sans-serif',
};

theme.sizes = {};

theme.animations = {
  slideDown: keyframes`
    0% {
      transform: translateY(-110%);
      display: flex;
      opacity: 0;
    }
    20% {
      transform: translateY(-88);
      opacity: .2;
    }
    40% {
      transform: translateY(-66);
      opacity: .4;
    }
    60% {
      transform: translateY(-44);
      opacity: .6;
    }
    80% {
      transform: translateY(-22);
      opacity: .8;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
`,
  slideUp: keyframes`
    0% {
      transform: translateY(0%); 
      display: flex;
      opacity: 1;
    }
    20% {
      transform: translateY(-22%);
      opacity: .6;
    }
    40% {
      transform: translateY(-44%);
      opacity: 0;
    }
    60% {
      transform: translateY(-66%);
      opacity: 0;
    }
    80% {
      transform: translateY(-88%);
      opacity: 0;
    }
    100% {
      transform: translateY(-110%);
      display: none !important;
      opacity: 0;
      border-bottom: none;
    }
`,
};

export const { sizes } = theme;

export default theme;
