import React from 'react';
import { storiesOf } from '@storybook/react';
import NotificationCommonSuccess from './NotificationCommonSuccess';

storiesOf('molecules/NotificationCommonSuccess', module)
  .add('default', () => <NotificationCommonSuccess text="Success" />);
