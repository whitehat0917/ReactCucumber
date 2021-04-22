import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox';

storiesOf('atoms/Checkbox', module)
  .add('default', () => <Checkbox onChange={action('changed')} />)
  .add('checked', () => <Checkbox onChange={action('changed')} checked />)
  .add('checked by default', () => <Checkbox defaultValue />)
  .add('disabled', () => <Checkbox disabled />)
  .add('with label', () => <Checkbox label="Label" />);
