import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NotificationError from './NotificationError';

storiesOf('molecules/NotificationError', module)
  .add('default', () => <NotificationError text="Error" onClick={action('clicked')} />)
  .add('without retry button', () => <NotificationError text="Error" onClick={action('clicked')} withRetry={false} />);
