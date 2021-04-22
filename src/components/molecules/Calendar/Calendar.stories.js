import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Calendar from './Calendar';

storiesOf('molecules/Calendar', module)
  .add('default', () => <Calendar selected={new Date()} onChange={action('date changed')} />);
