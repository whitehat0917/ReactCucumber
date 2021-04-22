import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropzone from './Dropzone';

const props = {
  onDrop: action('on drop'),
  onCancel: action('canceled'),
  onRemoveFileClick: action('file removed'),
};

storiesOf('molecules/Dropzone', module)
  .add('default', () => <Dropzone {...props} />)
  .add('disabled', () => <Dropzone {...props} disabled />);
