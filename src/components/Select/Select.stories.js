import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from './Select';

const defaultValue = {
  value: 0,
  label: 'Value 0',
};

const options = [
  {
    value: 0,
    label: 'Value 0',
  },
  {
    value: 1,
    label: 'Value 1',
  },
];

storiesOf('atoms/Select', module)
  .add('default with value and options', () => (
    <Select
      value={defaultValue}
      options={options}
      onChange={action('changed')}
    />
  ))
  .add('with label', () => (
    <Select
      label="Label"
      value={defaultValue}
      options={options}
      onChange={action('changed')}
    />
  ))
  .add('with error', () => (
    <Select
      value={defaultValue}
      options={options}
      onChange={action('changed')}
      error
      errorText="Error"
    />
  ));
