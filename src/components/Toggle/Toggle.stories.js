import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Toggle from './Toggle';

storiesOf('atoms/TextArea', module)
  .add('default', () => <Toggle onChange={action('clicked')} />)
  .add('checked', () => <Toggle checked onChange={action('clicked')} />)
  .add('with custom labels', () => <Toggle leftLabel="A" rightLabel="B" onChange={action('clicked')} />);
