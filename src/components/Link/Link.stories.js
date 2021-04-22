/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Link from './Link';

storiesOf('atoms/Link', module)
  .add('default', () => <Link to="/">Link</Link>)
  .add('anchor link to an external resource', () => <Link type="anchor" to="/">Link</Link>)
  .add('pseudo link with onClick event', () => <Link type="pseudo" onClick={action('clicked')}>Link</Link>)
  .add('normal size', () => <Link size="normal" to="/">Link</Link>)
  .add('small size', () => <Link size="small" to="/">Link</Link>);
