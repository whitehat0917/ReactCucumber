/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from 'organisms/SignUpForm';
import { push } from 'connected-react-router';
import authService from 'services/auth';
import { connect } from 'react-redux';
import qs from 'query-string';
import { registrationRequest } from 'store/actions';
import { fromRegistration } from 'store/selectors';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';

userAnalyticsService.initialize();

class SignUpFormContainer extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  }

  componentDidMount() {
    const { pushPage } = this.props;
    if (authService.isLoggedIn()) {
      return pushPage('/');
    }

    const page = '/signup';
    // userAnalyticsService.set({ page });
    // userAnalyticsService.ga('send', 'pageview', { page });
    // return customAnalyticsService.trackGA('pageview', 'pageview', page);
  }

  handleSubmit = (e) => {
    const { requestRegistration } = this.props;
    const { is_whiteglove } = qs.parse(window.location.search);
    const {
      first_name, last_name, email, password1, password2,
    } = this.state;
    e.preventDefault();
    requestRegistration({
      first_name, last_name, email, password1, password2, isWhiteglove: Boolean(is_whiteglove),
    });
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const {
      first_name, last_name, email, password1, password2,
    } = this.state;
    const { registrationStatus } = this.props;

    return (
      <SignUpForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        first_name={first_name}
        last_name={last_name}
        email={email}
        password1={password1}
        password2={password2}
        registrationStatus={registrationStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  registrationStatus: fromRegistration.getStatus(state, 'registration'),
});

const mapDispatchToProps = (dispatch) => ({
  pushPage: (url) => dispatch(push(url)),
  requestRegistration: (creds) => dispatch(registrationRequest(creds)),
});

SignUpFormContainer.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestRegistration: PropTypes.func.isRequired,
  registrationStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
