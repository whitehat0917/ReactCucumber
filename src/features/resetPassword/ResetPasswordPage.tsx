import React from 'react';
import { useSelector } from 'react-redux';
import ProfileTemplate from '../../templates/ProfileTemplate';
import ResetPasswordForm from './ResetPasswordForm';

import { STATUS_INFO } from 'features/user/selectors';
import { coreSelector } from 'features/core/selectors/selectors';

const ResetPasswordPage = (location) => {
    const { status, publicInfo, loginStatus, resetPasswordStatus } = useSelector(coreSelector(STATUS_INFO));

    return  (
        <ProfileTemplate isEmpty
            location={location}>
            <ResetPasswordForm 
                resetPasswordStatus={resetPasswordStatus} />
        </ProfileTemplate>
    );
}

export default ResetPasswordPage;
