import { all } from 'redux-saga/effects';

import watchResetPassword from './resetPassword';
import watchChangePasswordRequest from './changePassword';

export default function* resetPasswordSagaSaga() {
    yield all([
        watchResetPassword(),
        watchChangePasswordRequest(),
    ]);
};