import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import qs from 'query-string';
// import authService from 'services/auth';
import { useDispatch } from 'react-redux';
import { magicLoginRequest, authError } from '../coreSlice';

const MagicLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const { magic_token: magicToken } = qs.parse(window.location.search);

        // console.log('magicToken -> ', magicToken);

        if (magicToken) {
            dispatch(magicLoginRequest({ magicToken }));
        }

    }, [dispatch]);

    return 'Logging in, please wait...';
}

// class MagicLogin extends React.PureComponent {
//   componentDidMount() {
//     const { pushPage, requestLogin, createNotification } = this.props;
//     if (authService.isLoggedIn()) {
//       pushPage('/');
//       createNotification({
//         type: 'commonSuccess',
//         timeout: 5000,
//         text: 'Already logged in',
//       });
//       return;
//     }
    
//     const { magic_token: magicToken } = qs.parse(window.location.search);
//     if (magicToken) {
//       requestLogin(magicToken);
//     } else {
//       pushPage('/login');
//     }
//   }

//   render() {
//     return 'Logging in, please wait...';
//   }
// }

// MagicLogin.propTypes = {
//   requestLogin: PropTypes.func.isRequired,
//   pushPage: PropTypes.func.isRequired,
//   createNotification: PropTypes.func.isRequired,
// };

export default MagicLogin;
