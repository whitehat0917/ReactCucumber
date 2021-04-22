import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('atoms/Input', module)
  .add('default', () => <Input />)
  .add('disabled', () => <Input disabled />)
  .add('with type="password"', () => <Input type="password" />)
  .add('with error', () => <Input error errorText="Error" />);
