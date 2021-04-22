
import { createGlobalStyle } from 'styled-components';
import theme from 'theme';

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    height: 100%;
    font-family: NeueHaasLight;
    font-size: 16px;
    background-color: ${theme.palette.appBackground};
}

.ReactModal__Body--open {
    overflow: hidden;
    padding-right: 17px;
    @media only screen and (max-width: 768px) { 
        padding-right: 0;
    }
    #app > .PageTemplate__wrapper {
        filter: blur(7px);
    }
}
`;
