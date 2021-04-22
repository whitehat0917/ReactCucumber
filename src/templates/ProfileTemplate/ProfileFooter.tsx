import React from 'react';

import {
    FooterContent,
    Divider,
    PrivacyPolicyLink,
    PrivacyPolicy,
    FooterBottomHolder,
    DIVIDER_COLOR,
} from './styled';

const COPYRIGHT = '2019 © Marcel Art';
const PRIVACY_POLICY = 'Privacy Policy';
const TERMS_OF_USE = 'Terms of Use';

const ProfileFooter = () => {
    return (
        <FooterContent
            borderColor={DIVIDER_COLOR}>
            <FooterBottomHolder>
                <PrivacyPolicy>
                    <PrivacyPolicyLink>{ COPYRIGHT }</PrivacyPolicyLink>
                    <PrivacyPolicyLink href="https://www.marcelforart.com/privacy-policy/" target="_blank">{ PRIVACY_POLICY }</PrivacyPolicyLink>
                    <PrivacyPolicyLink href="https://www.marcelforart.com/terms/" target="_blank">{ TERMS_OF_USE }</PrivacyPolicyLink>
                </PrivacyPolicy>
            </FooterBottomHolder>
        </FooterContent>
    )
};

export default ProfileFooter;
