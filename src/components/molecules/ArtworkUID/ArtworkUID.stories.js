import React from 'react';
import { storiesOf } from '@storybook/react';
import ArtworkUID from './ArtworkUID';

storiesOf('molecules/ArtworkUID', module)
  .add('default', () => <ArtworkUID id="ID" />);
