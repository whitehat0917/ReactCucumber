import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Sorting from './Sorting';


storiesOf('molecules/Sorting', module)
  .add('default', () => <Sorting onSortChange={action('sorting changed')} />)
  .add('custom sortBy option and order option', () => <Sorting sortBy="price" order="asc" onSortChange={action('sorting changed')} />);
