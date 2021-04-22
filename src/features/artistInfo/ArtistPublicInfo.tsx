import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import Menu, { menuItems } from 'components/Menu';
// import MinorLoader from 'components/MinorLoader';
import { MenuIcon } from 'components/Menu';

import { STATUS_PUBLIC_INFO, artistPublicInfoSelector } from './selectors';

import { artistPublicInfoRequest } from './artistInfoSlice';

import {
    ArtistName,
    ArtistHomeLink,
    HeaderWrapper,
    MainAndButtonsWrapper,
    NameAndBioWrapper,
    IconWrapper,
    MainWrapper,
} from './styled';
import { Skeleton } from 'styled';

const RenderArtistName = ({ publicInfo, isOpen, isLoading }) => {
    if (!publicInfo.marcel_username && isLoading) {
        return (
            <ArtistHomeLink to={`/${publicInfo.marcel_username}`}>
                <Skeleton width="200px" />
            </ArtistHomeLink>
        );
    }

    if (!publicInfo.marcel_username && !isLoading) {
        return null;
    }

    return (
        <ArtistHomeLink to={`/${publicInfo.marcel_username}`}>
            <ArtistName isOpen={isOpen}>{ `${publicInfo.first_name || ''} ${publicInfo.last_name || ''}` }</ArtistName>
        </ArtistHomeLink>
    );
}

const RenderNavigation = ({ publicInfo, isOpen, isLoading, isDesktop }) => {
    if (!isLoading) {
        return (
            <Menu
                isOpen={isOpen}
                publicInfo={publicInfo}
                isDesktop={isDesktop}
                items={menuItems(publicInfo)} />
        );
    }

    return null;
}

const ArtistPublicInfo = ({
    isOpen,
    isDesktop,
    isHomeAbout,
    hideScrollView,
    handleOpenMenu,
}) => {
    const dispatch = useDispatch();
    const { status, publicInfo } = useSelector(artistPublicInfoSelector(STATUS_PUBLIC_INFO));
    const params = useParams();

    useEffect(() => {
       if (_.isEmpty(status.errors)) {
            if (_.isEmpty(publicInfo) && !status.isLoading) {
                dispatch(artistPublicInfoRequest(params.userName));
            }
       }
    }, [dispatch, status, publicInfo]);

    return (
        <HeaderWrapper
            hideView={!hideScrollView}
            isHomeAbout={isHomeAbout}>
            <MainAndButtonsWrapper isDesktop={isDesktop}>
                <IconWrapper>
                    <MenuIcon
                        isDesktop={isDesktop}
                        onClick={handleOpenMenu} />
                </IconWrapper>
                <MainWrapper>
                    <NameAndBioWrapper>
                        <RenderArtistName
                            isOpen={isOpen}
                            isLoading={status.isLoading}
                            publicInfo={publicInfo} />
                    </NameAndBioWrapper>
                </MainWrapper>
                <RenderNavigation
                    publicInfo={publicInfo}
                    isOpen={isOpen}
                    isLoading={status.isLoading}
                    isDesktop={isDesktop} />
            </MainAndButtonsWrapper>
        </HeaderWrapper>
    );
}

export default ArtistPublicInfo;
