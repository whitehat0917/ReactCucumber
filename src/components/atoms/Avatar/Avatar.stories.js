import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from './Avatar';
import TestImage from '../Icon/cloud.svg';

storiesOf('atoms/Avatar', module)
  .add('default', () => <Avatar />)
  .add('with custom source', () => <Avatar src={TestImage} />);
