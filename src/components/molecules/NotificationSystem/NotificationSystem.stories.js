import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NotificationSystem from './NotificationSystem';

const props = {
  notification: {
    id: 1,
    timeout: 100,
    open: true,
  },
  closeNotification: action('closed'),
  deleteNotification: action('deleted'),
  handleButton: action('handle button click'),
};

storiesOf('molecules/NotificationSystem', module)
  .add('type="saveChangesError"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'saveChangesError' }} />)
  .add('type="uploadError"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'uploadError', text: 'Custom text' }} />)
  .add('type="deleteError"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'deleteError' }} />)
  .add('type="saveChangesSuccess"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'saveChangesSuccess' }} />)
  .add('type="deleteSuccess"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'deleteSuccess' }} />)
  .add('type="uploadSuccess"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'uploadSuccess' }} />)
  .add('type="loginWithGoogleError"', () => <NotificationSystem {...props} notification={{ ...props.notification, type: 'loginWithGoogleError' }} />);
