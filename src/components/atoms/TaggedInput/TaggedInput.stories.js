import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TaggedInput from './TaggedInput';

const values = [
  'Value1',
  'Value2',
];

storiesOf('atoms/TaggedInput', module)
  .add('default', () => <TaggedInput />)
  .add('with values', () => <TaggedInput values={values} onDelete={action('deleted')} onAdd={action('added')} />)
  .add('with placeholder', () => <TaggedInput placeholder="Enter values" onDelete={action('deleted')} onAdd={action('added')} />)
  .add('with custom tags number limit', () => <TaggedInput maxTagsNumber={1} onDelete={action('deleted')} onAdd={action('added')} />);
