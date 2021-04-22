import { 
    userInfoRequest,
} from 'features/user/userSlice';

import { initApp } from 'features/core/coreSlice';

const setUserInfoMiddleware = store => next => action => {
    const { user } = store.getState();

    const marcelAction = {
        ...action,
        payload: {
            ...action.payload,
            user
        }
    };

    return next(marcelAction);
}

export default setUserInfoMiddleware;