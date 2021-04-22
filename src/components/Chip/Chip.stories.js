import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Chip from './Chip';

storiesOf('atoms/Chip', module)
  .add('default', () => <Chip />)
  .add('default with label', () => <Chip label="Label" />)
  .add('big size', () => <Chip size="big" label="Label" />)
  .add('with onDelete prop', () => <Chip label="Label" onDelete={action('clicked')} />);
