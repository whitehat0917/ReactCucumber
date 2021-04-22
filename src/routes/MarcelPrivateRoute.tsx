import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import authService from 'services/auth';
import amplitude from 'amplitude-js';
// import { RootState } from 'app/rootReducer';
// import { getParsedData } from 'utils/localStorage';
// import { TUserState } from 'features/user/user-types';
import { userSelector, STATUS_INFO } from 'features/user/selectors';
import useUserAuthStatus from 'features/user/hooks/useUserAuthStatus';

let isUserIdSet = false;

const RenderRoute = ({ component: Component, roles, status, authorized, ...rest }) => {
    const { isAuthorized } = useUserAuthStatus();
    // const token = getParsedData('auth_token');

    // if (roles && authService.isLoggedIn() && !status.hasNeverLoaded) {
    //     if (roles.includes('staff') && !status.isStaff) {
    //         return (
    //             <Redirect to={{pathname: '/'}} />
    //         );
    //     }
    // }

    return <Route { ...rest }
        render={ props => (isAuthorized
                ? <Component { ...props } />
                : (
                    <Redirect to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                ))
            }
        />
};

const MarcelPrivateRoute = ({ component, onLoad, computedMatch, roles, authorized, ...rest }) => {
    const dispatch = useDispatch();
    const { status, info } = useSelector(userSelector(STATUS_INFO));

    useEffect(() => {
        if (typeof onLoad !== 'undefined') {
            dispatch(onLoad(computedMatch));
        }

        if (!isUserIdSet && info.id) {
            isUserIdSet = true;
            amplitude.getInstance().setUserId(info.id);
        }

    }, [dispatch, isUserIdSet]);

    return <RenderRoute 
        roles={roles} 
        status={status}
        authorized={authorized}
        component={component} 
        { ...rest } />
}

export default MarcelPrivateRoute;