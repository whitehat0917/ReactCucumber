import { useMachine } from '@xstate/react';
import LoadingOverlay from 'components/LoadingOverlay';
import { artistPublicInfoSelector, STATUS_PUBLIC_INFO } from 'features/artistInfo/selectors';
import useScrollToTop from 'features/core/hooks/useScrollToTop';
import { artistInfoMachine } from 'model/machines/artist.machine';
import React from 'react';
import { useSelector } from 'react-redux';
import ScrollLoader from '../../components/ScrollLoader';
import { TUserInfo } from '../../features/user/user-types';
import MarcelFooter from '../Footer';
// import LayoutContainer from 'atoms/LayoutContainer';
// import PageHeader from 'containers/PageHeader';
// import LoadingOverlay from 'components/LoadingOverlay';
import MarcelHeader from '../Header';
import { Content, Footer, Header, Wrapper } from './styled';

interface IPageTemplate {
  children: React.ReactElement;
  isLoading?: boolean;
  publicInfo?: TUserInfo | {};
  location?: Location;
  onLoadMore?: () => void;
  loadThreshold?: number;
  scrollRef?: React.RefObject<HTMLElement>;
}

export const PageTemplate: React.FC<IPageTemplate> = ({ children, isLoading }) => {
  const [artistInfoState, sendArtistInfoMachine] = useMachine(artistInfoMachine);
  const { publicInfo, status } = useSelector(artistPublicInfoSelector(STATUS_PUBLIC_INFO));
  useScrollToTop();

  return (
    <Wrapper className="PageTemplate__wrapper">
      <Header position="relative">
        <MarcelHeader />
      </Header>
      <Content id="pageContent">{children}</Content>
      <Footer>
        <MarcelFooter status={status} publicInfo={publicInfo} />
      </Footer>
      {isLoading && <LoadingOverlay semiTransparent={true} zIndex={2222} />}
    </Wrapper>
  );
};

export const PageTemplateLoader: React.FC<IPageTemplate> = ({ onLoadMore, loadThreshold, scrollRef, children }) => {
  return (
    <ScrollLoader onLoadMore={onLoadMore} scrollRef={scrollRef} loadThreshold={loadThreshold}>
      <PageTemplate>{children}</PageTemplate>
    </ScrollLoader>
  );
};

export default PageTemplate;
