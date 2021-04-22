import React from 'react';
import { storiesOf } from '@storybook/react';
import TextField from './TextField';

storiesOf('molecules/TextField', module)
  .add('default', () => <TextField label="Label" />);
