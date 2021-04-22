import React, { Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import GlobalRoutes from 'containers/GlobalRoutes';
import theme from './themes/default';

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    background-color: ${theme.palette.gray[10]};
    margin: 0;
    height: 100%;
    font-size: 16px;
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

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalRoutes />
      <GlobalStyle />
    </Fragment>
  </ThemeProvider>
);

export default App;
