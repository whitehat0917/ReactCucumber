import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromNotifications } from 'store/selectors';
import { notificationDequeue, notificationClose, notificationHandleButton } from 'store/actions';
import NotificationSystem from 'molecules/NotificationSystem';

const NotificationSystemContainer = (props) => <NotificationSystem {...props} />;

const mapStateToProps = (state) => ({
  notification: fromNotifications.getCurrentNotification(state),
});

const mapDispatchToProps = (dispatch) => ({
  closeNotification: () => dispatch(notificationClose()),
  deleteNotification: () => dispatch(notificationDequeue()),
  handleButton: (data) => dispatch(notificationHandleButton(data)),
});

NotificationSystemContainer.propTypes = {
  notification: PropTypes.object,
  closeNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSystemContainer);
