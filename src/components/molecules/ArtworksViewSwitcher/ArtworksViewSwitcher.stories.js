import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ArtworksViewSwitcher from './ArtworksViewSwitcher';

storiesOf('molecules/ArtworksViewSwitcher', module)
  .add('default', () => <ArtworksViewSwitcher changeMode={action('mode changed')} />)
  .add('with checked mode', () => <ArtworksViewSwitcher mode="list" changeMode={action('mode changed')} />);
