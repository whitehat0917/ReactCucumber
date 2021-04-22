import React from 'react';
import _ from 'lodash';
import LoadingOverlay from 'components/LoadingOverlay';

import ScrollLoader from "../../components/ScrollLoader";

import ProfileHeader, { EmptyHeader } from './ProfileHeader';
import ProfileFooter from './ProfileFooter';

import {
    Wrapper,
    Header,
    Content,
    Footer,
} from '../PageTemplate/styled';

import { TUserInfo } from '../../features/user/user-types';

interface IPageTemplate {
    children: React.ReactElement,
    isLoading?: boolean,
    artistInfo?: TUserInfo | {},
    location?: Location,
    isEmpty?: boolean,
    onLoadMore?: () => void
}

const ProfileTemplate: React.FC<IPageTemplate> = ({ children, onLoadMore, isEmpty = false }) => {
    return (
        <ScrollLoader onLoadMore={onLoadMore}>
            <Wrapper className="HomeTemplate__wrapper">
                <Header
                    position="relative">
                    { !isEmpty
                        ? <ProfileHeader />
                        : <EmptyHeader /> }
                </Header>
                <Content id="pageContent">
                    { children }
                </Content>
                <Footer>
                    <ProfileFooter />
                </Footer>
            </Wrapper>
        </ScrollLoader>
    );
}

export default ProfileTemplate;
