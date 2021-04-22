import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { authMagicLoginRequest, notificationCreate } from 'store/actions'
import MagicLogin from 'molecules/MagicLogin';

const MagicLoginContainer = (props) => <MagicLogin {...props} />;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (magicToken) => dispatch(authMagicLoginRequest({ magicToken })),
  pushPage: (url) => dispatch(push(url)),
  createNotification: (data) => dispatch(notificationCreate(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MagicLoginContainer);
