import { reversePalette } from 'styled-theme/composer';
import { keyframes } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

type TPalette = {
    [k: string]: string | {
        [j: string]: string
    }
}

export type TTheme = {
    palette?: TPalette,
    reversePalette?: TPalette,
    fonts?: {
        [k: string]: string
    },
    sizes?: {},
    animations?: any,
}

const theme: TTheme = {};

theme.palette = {
    gray: {
        10: '#F2F2F2',
        20: '#EAEAEA',
        30: '#D5D5D5',
        40: '#FFFAF7',
        45: '#CFD6DE',
        50: '#919191',
        60: '#5C5C5C',
        100: '#121212',
    },
    primary: {
        10: '#FFCEB3',
        30: '#FF5B00',
        40: '#E65200',
        50: '#F86A28',
        60: '#FF782E',
        70: '#FFBD99',
        80: '#FFDECC',
        100: '#F63C26',
    },
    gradient: {
        from: '#FF7E01',
        to: '#FF5001',
    },
    textLight: '#9B9B9B',
    divider: '#EEF2F5',
    white: '#FFFFFF',
    black: '#000',
    red: '#FF0000',
    error: '#FF3B30',
    success: '#00A878',
    greyBackground: '#F8F8F8',
    footer: '#919191',
    appBackground: '#FFF',
    sliderDots: '#C9CBCC',
    sliderDotsActive: '#FF5F0E',
    statuses: {
        1: '#00A878',
        2: '#FF3B30',
    }
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
    primary: 'NeueHaasUnica',
    black: 'NeueHaasBlack',
    bold: 'NeueHaasBold',
    heavy: 'NeueHaasUnicaHeavy',
    light: 'NeueHaasLight',
    medium: 'NeueHaasMedium',
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
