import React from 'react';
import { storiesOf } from '@storybook/react';
import TextArea from './Textarea';

storiesOf('atoms/TextArea', module)
  .add('default', () => <TextArea />)
  .add('disabled', () => <TextArea disabled />)
  .add('focused by default', () => <TextArea autoFocus />)
  .add('with error', () => <TextArea error errorText="Error" />);
