import { resetGalleryState } from 'features/privateGallery/privateGallerySlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTemplate from '../../../templates/ProfileTemplate';
import { STATUS_INFO } from '../../user/selectors';
// import { getMagicLogin } from '../coreSlice';
import useScrollToTop from '../hooks/useScrollToTop';
import { coreSelector } from '../selectors/selectors';
import LoginForm from './LoginForm';

const LoginPage = (location) => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector(coreSelector(STATUS_INFO));

  // useEffect(() => {
  //     dispatch(getMagicLogin({ email: 'asyst.dnb@gmail.com' }))
  // }, []);
  useEffect(() => {
    dispatch(resetGalleryState());
  }, []);

  useScrollToTop();

  return (
    <ProfileTemplate isEmpty location={location}>
      <LoginForm loginStatus={loginStatus} />
    </ProfileTemplate>
  );
};

export default LoginPage;
