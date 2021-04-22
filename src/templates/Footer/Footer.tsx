import React, { Fragment } from 'react';
import { v4 } from 'uuid';
import _ from 'lodash';
import Logo from '../../components/Logo';
import AppStoreLink from '../../components/AppStoreLink';
// import Button from 'atoms/Button';

import { TUserInfo } from 'features/user/user-types';
import { FetchStatus } from 'app/global-types';

import {
    FooterContent,
    FooterTitle,
    FooterLink,
    FooterColumn,
    Divider,
    PrivacyPolicyLink,
    PrivacyPolicy,
    FooterBottomHolder,
    LinkHolder,
    TopHolder,
    ColumnHolder,
    DIVIDER_COLOR,
    FooterSocialLink,
} from './styled';
import RenderSocialLinks from 'features/user/ArtistHome/RenderSocialLinks';
import useArtistSocialLinks from 'features/user/hooks/useArtistSocialLinks';
import { Skeleton } from 'styled';

const COPYRIGHT = '2019 © Marcel Art';
const PRIVACY_POLICY = 'Privacy Policy';
const TERMS_OF_USE = 'Terms of Use';

const RenderFooterNavigation = ({ marcelName, isLoading }) => {
    const pages = [
        {
            to: `/${marcelName}`,
            label: 'Home'
        },
        {
            to: `/${marcelName}/collections`,
            label: 'Collections'
        },
        {
            to: `/${marcelName}/about`,
            label: 'About'
        },
        {
            to: `/${marcelName}/contact`,
            label: 'Contact'
        },
    ];

    return (
        <Fragment>
            {pages.map(page => {
                if (!marcelName && isLoading) {
                    return (
                        <FooterLink key={v4()} to={`/`}>
                            <Skeleton width="100px" margin="0 0 20px" />
                        </FooterLink>
                    ); 
                }

                if (!marcelName && !isLoading) {
                    return null; 
                }
                
                return (
                    <FooterLink key={v4()} to={page.to}>
                        {page.label}
                    </FooterLink>
                );
            })}
        </Fragment>
    );
}

const RenderUserName = ({ userName, isLoading }) => {
    if (!userName && isLoading) {
        return (
            <FooterTitle>
                <Skeleton width="200px" />
            </FooterTitle>
        );
    }

    if (!userName && !isLoading) {
        return null;
    }

    return <FooterTitle>{ userName }</FooterTitle>;
}

const RenderLinks = ({ userName, marcelName, socialLinks, isLoading }) => {
    return (
        <TopHolder>
            <RenderUserName userName={userName} isLoading={isLoading} />
            <ColumnHolder>
                <FooterColumn>
                    <RenderFooterNavigation marcelName={marcelName} isLoading={isLoading} />
                </FooterColumn>
                <FooterColumn>
                    <RenderSocialLinks
                        width="100px"
                        margin="0 0 20px"
                        linkComponent={FooterSocialLink} 
                        socialLinks={socialLinks} />
                </FooterColumn>
            </ColumnHolder>
        </TopHolder>
    );
}

interface IMarcelFooter {
    publicInfo: TUserInfo
    status: FetchStatus
}

const MarcelFooter: React.FC<IMarcelFooter> = ({ publicInfo, status }) => {
    const userName =  publicInfo && !_.isEmpty(publicInfo) ? `${publicInfo.first_name} ${publicInfo.last_name}` : null;
    const socialLinks = useArtistSocialLinks(publicInfo.social_links);

    return (
        <FooterContent
            userName={publicInfo.first_name} 
            borderColor={DIVIDER_COLOR}>
            <RenderLinks 
                socialLinks={socialLinks}
                isLoading={status && status.isLoading}
                marcelName={publicInfo.marcel_username}
                userName={publicInfo && userName} />
            <Divider color={DIVIDER_COLOR} />
            <FooterBottomHolder>
                <LinkHolder>
                    <Logo />
                </LinkHolder>
                <LinkHolder>
                    <AppStoreLink />
                </LinkHolder>
                <PrivacyPolicy>
                    <PrivacyPolicyLink>{ COPYRIGHT }</PrivacyPolicyLink>
                    <PrivacyPolicyLink href="https://www.marcelforart.com/privacy-policy/" target="_blank">{ PRIVACY_POLICY }</PrivacyPolicyLink>
                    <PrivacyPolicyLink href="https://www.marcelforart.com/terms/" target="_blank">{ TERMS_OF_USE }</PrivacyPolicyLink>
                </PrivacyPolicy>
            </FooterBottomHolder>
        </FooterContent>
    )
};

export default MarcelFooter;