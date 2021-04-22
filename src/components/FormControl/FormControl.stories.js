import React from 'react';
import { storiesOf } from '@storybook/react';
import FormControl from './FormControl';

storiesOf('atoms/FormControl', module)
  .add('with label and child', () => <FormControl label="Form Control"><input value="Input" /></FormControl>);
