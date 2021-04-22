import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ArtworkImage from './ArtworkImage';
import TestImage from '../../atoms/Icon/cloud.svg';

const image = {
  thumbnails: {
    mid: TestImage,
  },
  image_original: TestImage,
};

storiesOf('molecules/ArtworkImage', module)
  .add('default', () => <ArtworkImage image={image} width={100} onDelete={action('deleted')} />);
