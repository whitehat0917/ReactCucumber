import { push } from 'connected-react-router';

import { 
    userInfoRequest,
} from 'features/user/userSlice';

import { initApp } from 'features/core/coreSlice';
import { NOT_FOUND } from 'services';

const REPLACE = 'REPLACE';

const initAppMiddleware = store => next => action => {
    if (action.type === "@@router/LOCATION_CHANGE") {
        const { payload: { location: { pathname } } } = action;

        const [,userName] = pathname.split('/');

        if (action.payload.isFirstRendering) {
            store.dispatch(initApp({ 
                initializing: true,
                userName: userName ? userName : '',
                pathname
            })); 
        }

        return next(action);
    }

    // if (action.payload && action.payload.status === NOT_FOUND) {
    //     store.dispatch(push('/404'));
    // }

    return next(action);
}

export default initAppMiddleware;