import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ArtworkNote from './ArtworkNote';

const props = {
  text: 'Text',
  onCancel: action('canceled'),
  onSubmit: action('submitted'),
  onClick: action('clicked'),
  onDelete: action('deleted'),
};

storiesOf('molecules/ArtworkNote', module)
  .add('default', () => <ArtworkNote {...props} />)
  .add('with custom date', () => <ArtworkNote {...props} date="10.10.2018" />)
  .add('editing mode', () => <ArtworkNote {...props} editing />);
