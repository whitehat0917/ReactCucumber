import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
// authError
// fetchError
// not found - 404
//

const LOGIN = '/login';
const PAGE_404 = '/404';

const AUTH_ERROR = 'core/authError';
// const FETCH_ERROR = 'core/fetchError';
const NOT_FOUND = 'core/notFound';
const INVALID_TOKEN = 'core/invalidToken';

const COMMON_TEXT = 'You are unathorized, please Sign in';
const INVALID_TOKEN_TEXT = 'Invalid login link. Please re-login';

const tokenToastId = v4();
const authToastId = v4();

const catchErrorsMiddleware = store => next => action => {
    if (action.type === INVALID_TOKEN) {
        store.dispatch(push(LOGIN));

        if (!toast.isActive(tokenToastId)) {
            toast.error(`${INVALID_TOKEN_TEXT} 🙁`, {
                toastId: tokenToastId
            });
        }
    }

    if (action.type === AUTH_ERROR) {
        store.dispatch(push(LOGIN));
    }

    if (action.type === NOT_FOUND) {
        store.dispatch(push(PAGE_404));
    }

    next(action);
}

export default catchErrorsMiddleware;
