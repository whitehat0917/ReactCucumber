import { ModalContextProvider } from 'components/molecules/ModalContext';
import { ConnectedRouter } from 'connected-react-router';
import { LanguageProvider } from 'features/core/i18n/LanguageProvider';
import { coreSelector } from 'features/core/selectors/selectors';
import { STATUS_INFO } from 'features/user/selectors';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from 'routes';
import 'semantic-ui-css/components/icon.css';
// import Notify from 'features/notify/Notify';
// import { useLocation } from 'react-router-dom';
// const InitRoutes = ({ initializide, authorized }) => {
//   if (initializide) {
//     return <Routes authorized={authorized} />
//   }
//   return null;
// }
import monitoringService from 'services/sentry';
import history from 'store/history';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import { ArtistDataContextProvider } from '../features/core/context/artistInfo.context';
import { GlobalStyle } from './globalStyle';
import './style.css';

const App = () => {
  useEffect(() => {
    monitoringService.init();
  }, []);

  const { authorized } = useSelector(coreSelector(STATUS_INFO));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ArtistDataContextProvider>
        <ConnectedRouter history={history}>
          <LanguageProvider>
            <ModalContextProvider>
              <Routes authorized={authorized} />
              {/* <Notify /> */}
              <ToastContainer autoClose={10000} position={toast.POSITION.BOTTOM_RIGHT} />
            </ModalContextProvider>
          </LanguageProvider>
        </ConnectedRouter>
      </ArtistDataContextProvider>
      {/* <ConnectedRouter history={history}>
        <GlobalRoutes />
        <GlobalStyle />
      </ConnectedRouter> */}
    </ThemeProvider>
  );
};

export default App;
