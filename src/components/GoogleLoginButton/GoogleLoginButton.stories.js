import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GoogleLoginButton from './GoogleLoginButton';

storiesOf('molecules/GoogleLoginButton', module)
  .add('default', () => <GoogleLoginButton onClick={action('clicked')} />);
