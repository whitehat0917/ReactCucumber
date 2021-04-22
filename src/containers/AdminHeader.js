import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { authLogoutRequest } from 'store/actions';
import AdminHeader from 'molecules/AdminHeader';
import authService from 'services/auth';

class AdminHeaderContainer extends Component {
  handleLogoutClick = () => {
    const { logout, pushPage } = this.props;
    logout();
    pushPage('/login');
  }

  render() {
    return (
      <AdminHeader
        isLoggedIn={authService.isLoggedIn()}
        onLogoutClick={this.handleLogoutClick}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogoutRequest()),
  pushPage: (url) => dispatch(push(url)),
});

AdminHeaderContainer.propTypes = {
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeaderContainer);
