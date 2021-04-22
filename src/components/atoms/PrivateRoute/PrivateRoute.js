import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import amplitude from 'amplitude-js';
import { userInfoRequest } from 'store/actions';
import { fromUser } from 'store/selectors';
import authService from 'services/auth';
import LoadingOverlay from 'molecules/LoadingOverlay';

class PrivateRoutesContainer extends React.Component {
  isUserIdSet = false;

  componentDidMount() {
    const { userInfoStatus, requestUserInfo } = this.props;
    // we don't want to restore impersonated sessions
    authService.logoutImpersonated();
    if (userInfoStatus.hasNeverLoaded && !userInfoStatus.isLoading && authService.isLoggedIn()) {
      requestUserInfo();
    }
  }

  componentDidUpdate() {
    const { userInfo } = this.props;
    if (!this.isUserIdSet && userInfo.id) {
      this.isUserIdSet = true;
      amplitude.getInstance().setUserId(userInfo.id);
    }
  }

  render() {
    const {
      userInfoStatus, component: Component, roles, location, userInfo, ...rest
    } = this.props;

    if (userInfoStatus.isLoading) {
      return <LoadingOverlay />;
    }

    if (roles && authService.isLoggedIn() && !userInfoStatus.hasNeverLoaded) {
      if (roles.includes('staff') && !userInfo.isStaff) {
        return (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        );
      }
    }

    return (
      <Route
        {...rest}
        render={() => (authService.isLoggedIn()
          ? <Component {...this.props} />
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          ))
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userInfoStatus: fromUser.getStatus(state, 'user_info'),
  userInfo: fromUser.getInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestUserInfo: () => dispatch(userInfoRequest()),
});

PrivateRoutesContainer.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  requestUserInfo: PropTypes.func.isRequired,
  userInfoStatus: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoutesContainer));
