import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'molecules/Snackbar';
import NotificationError from 'molecules/NotificationError';
import NotificationCommonSuccess from 'molecules/NotificationCommonSuccess';
import NotificationUploadSuccess from 'molecules/NotificationUploadSuccess';

const getNotificationComponent = (type, customText) => {
  switch (type) {
    case 'commonError':
      return (props) => (<NotificationError text={customText} withRetry={false} {...props} />);
    case 'saveChangesError':
      return (props) => (<NotificationError text="Changes are not saved." {...props} />);
    case 'uploadError':
      return (props) => (<NotificationError text={customText} withRetry={false} {...props} />);
    case 'deleteError':
      return (props) => (<NotificationError text="Artwork is not deleted." {...props} />);
    case 'saveChangesSuccess':
      return (props) => (<NotificationCommonSuccess text="Changes saved" data-type="changesSavedNotification" {...props} />);
    case 'deleteSuccess':
      return (props) => (<NotificationCommonSuccess text="Artwork deleted" data-type="artworkDeletedNotification" {...props} />);
    case 'uploadSuccess':
      return NotificationUploadSuccess;
    case 'sendMessageSuccess':
      return (props) => (<NotificationCommonSuccess text="Your message has been sent" data-type="sendMessageNotification" {...props} />);
    case 'loginWithGoogleError':
      return (props) => (<NotificationError text="Unable to log in. Please try again." withRetry={false} {...props} />);
    case 'commonError':
      return (props) => (<NotificationError text={customText} withRetry={false} {...props} />);
    case 'commonSuccess':
      return (props) => (<NotificationCommonSuccess text={customText} {...props} />);
    default:
      return null;
  }
};

const NotificationSystem = ({
  notification, closeNotification, deleteNotification, handleButton,
}) => {
  if (!notification) {
    return null;
  }
  const {
    type, open, timeout, text, ...rest
  } = notification;
  const Component = getNotificationComponent(type, text);
  if (!Component) {
    return null;
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      onExited={deleteNotification}
      autoHideDuration={timeout}
      onClose={closeNotification}
    >
      <Component
        onClick={() => handleButton({ id: notification.id, action: notification.action })}
        {...rest}
      />
    </Snackbar>
  );
};

NotificationSystem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    timeout: PropTypes.number,
    open: PropTypes.bool,
    type: PropTypes.string.isRequired,
  }),
  closeNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default NotificationSystem;
