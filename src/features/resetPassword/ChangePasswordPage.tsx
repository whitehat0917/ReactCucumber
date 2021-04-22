import React from 'react';
import { useSelector } from 'react-redux';
import ChangePasswordForm from './ChangePasswordForm';

import { STATUS_INFO } from 'features/user/selectors';
import { coreSelector } from 'features/core/selectors/selectors';
import ProfileTemplate from '../../templates/ProfileTemplate';

const ChangePasswordPage = (location) => {
    const { changePasswordStatus } = useSelector(coreSelector(STATUS_INFO));

    return  (
        <ProfileTemplate isEmpty
            location={location} >
            <ChangePasswordForm 
                status={changePasswordStatus} />
        </ProfileTemplate>
    );
}

export default ChangePasswordPage;
