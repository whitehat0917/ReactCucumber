import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Icon from './Icon';
import TestImage from './cloud.svg';

storiesOf('atoms/Icon', module)
  .add('default', () => <Icon>eye</Icon>)
  .add('small size', () => <Icon size="small">eye</Icon>)
  .add('big size', () => <Icon size="big">eye</Icon>)
  .add('custom color', () => <Icon color="primary">eye</Icon>)
  .add('clickable', () => <Icon clickable onClick={action('clicked')}>eye</Icon>)
  .add('custom source', () => <Icon src={TestImage} />);
