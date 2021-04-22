import React from 'react';
import { useSelector } from 'react-redux';
import ProfileTemplate from '../../../templates/ProfileTemplate';
import SignUpForm from './SignUpForm';

import { signUpSelector } from '../selectors/selectors';
import useScrollToTop from '../hooks/useScrollToTop';

const SignUpPage = (location) => {
    const { status } = useSelector(signUpSelector);

    useScrollToTop();

    return  (
        <ProfileTemplate 
            isEmpty
            location={location}>
            <SignUpForm 
                status={status} />
        </ProfileTemplate>
    );
}

export default SignUpPage;
