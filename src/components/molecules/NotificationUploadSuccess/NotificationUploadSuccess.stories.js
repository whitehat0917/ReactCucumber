import React from 'react';
import { storiesOf } from '@storybook/react';
import NotificationUploadSuccess from './NotificationUploadSuccess';

storiesOf('molecules/NotificationUploadSuccess', module)
  .add('default', () => <NotificationUploadSuccess text="Success" />);
