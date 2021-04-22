import { useSelector } from 'react-redux';
import { userSelector, STATUS_INFO } from '../selectors';

function useUserAuthStatus () {
    const { status } = useSelector(userSelector(STATUS_INFO));

    if (status.errorMessage) {
        return {
            isAuthorized: false
        };
    }

    return {
        isAuthorized: true
    }

}

export default useUserAuthStatus;