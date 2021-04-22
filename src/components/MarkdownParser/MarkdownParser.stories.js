import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownParser from './MarkdownParser';

const source = `
  ## About Me
  Award-winning designer born in Germany, raised in Austria and currently living in New York.
`;

storiesOf('atoms/MarkdownParser', module)
  .add('default', () => <MarkdownParser source={source} />);
