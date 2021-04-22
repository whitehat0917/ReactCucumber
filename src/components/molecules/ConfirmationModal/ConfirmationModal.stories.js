import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ConfirmationModal from './ConfirmationModal';

const props = {
  title: 'Title',
  name: 'Name',
  text: 'Text',
  confirmText: 'Confirm',
  onCancel: action('canceled'),
  onSubmit: action('submitted'),
};

storiesOf('molecules/ConfirmationModal', module)
  .add('default', () => <ConfirmationModal {...props} isOpen />)
  .add('loading state', () => <ConfirmationModal {...props} isOpen isLoading />);
