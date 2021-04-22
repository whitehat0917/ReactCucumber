import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from './Logo';

storiesOf('molecules/Logo', module)
  .add('default', () => <Logo />);
