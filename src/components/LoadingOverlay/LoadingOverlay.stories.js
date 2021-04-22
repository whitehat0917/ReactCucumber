import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingOverlay from './LoadingOverlay';

storiesOf('molecules/LoadingOverlay', module)
  .add('default', () => <LoadingOverlay />)
  .add('with label', () => <LoadingOverlay label="Label" />)
  .add('transparent', () => <LoadingOverlay transparent />);
