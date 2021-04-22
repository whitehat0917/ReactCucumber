import React from 'react';
import _ from 'lodash';

// import { userSelector, STATUS_PUBLIC_INFO } from 'features/user/selectors';
// import LayoutContainer from 'atoms/LayoutContainer';
// import PageHeader from 'containers/PageHeader';
// import LoadingOverlay from 'components/LoadingOverlay';
import MarcelHeader from '../Header';
import MarcelFooter from '../Footer';

import {
    HomeWrapper,
    Header,
    Content,
    Footer,
} from './styled';
import { TUserInfo } from '../../features/user/user-types';
import useScrollToTop from 'features/core/hooks/useScrollToTop';

interface IPageTemplate {
    children: React.ReactElement,
    isLoading?: boolean,
    publicInfo?: TUserInfo,
    location?: Location
}

const HomeTemplate: React.FC<IPageTemplate> = ({ children, publicInfo }) => {
    // if (isLoading) {
    //     return <LoadingOverlay />;
    // }
    useScrollToTop();

    return (
        <HomeWrapper className="HomeTemplate__wrapper">
            <Header
                position="relative">
                <MarcelHeader />
            </Header>
            <Content id="pageContent">
                { children }
            </Content>
            <Footer>
                <MarcelFooter publicInfo={publicInfo} />
            </Footer>
        </HomeWrapper>
    );
}

export default HomeTemplate;
