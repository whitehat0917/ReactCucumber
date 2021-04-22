import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

const ClickableButton = (props) => <Button onClick={action('clicked')} {...props} />;

storiesOf('atoms/Button', module)
  .add('default', () => <ClickableButton>Button</ClickableButton>)
  .add('gray', () => <ClickableButton styleType="gray">Button</ClickableButton>)
  .add('outlined', () => <ClickableButton styleType="outlined">Button</ClickableButton>)
  .add('big size', () => <ClickableButton size="big">Button</ClickableButton>)
  .add('small size', () => <ClickableButton size="small">Button</ClickableButton>)
  .add('disabled default', () => <ClickableButton disabled>Button</ClickableButton>)
  .add('disabled outlined', () => <ClickableButton disabled styleType="outlined">Button</ClickableButton>)
  .add('disabled gray', () => <ClickableButton disabled styleType="gray">Button</ClickableButton>)
  .add('loading', () => <ClickableButton loading>Button</ClickableButton>)
  .add('fullWidth', () => <ClickableButton fullWidth>Button</ClickableButton>);
