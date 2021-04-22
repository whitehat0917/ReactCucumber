import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Typography from './Typography';

storiesOf('atoms/Typography', module)
  .add('default', () => <Typography>Typography</Typography>)
  .add('type="display1"', () => <Typography type="display1">Typography</Typography>)
  .add('type="display2"', () => <Typography type="display2">Typography</Typography>)
  .add('type="display3"', () => <Typography type="display3">Typography</Typography>)
  .add('type="title1"', () => <Typography type="title1">Typography</Typography>)
  .add('type="title2"', () => <Typography type="title2">Typography</Typography>)
  .add('type="title3"', () => <Typography type="title3">Typography</Typography>)
  .add('type="subheading"', () => <Typography type="subheading">Typography</Typography>)
  .add('type="normal"', () => <Typography type="normal">Typography</Typography>)
  .add('type="small"', () => <Typography type="small">Typography</Typography>)
  .add('type="body"', () => <Typography type="body">Typography</Typography>)
  .add('type="caption"', () => <Typography type="caption">Typography</Typography>)
  .add('type="logo"', () => <Typography type="logo">Typography</Typography>);
