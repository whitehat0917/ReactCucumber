import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageHeaderDesktop from './PageHeaderDesktop';


storiesOf('molecules/PageHeaderDesktop', module)
  .add('default', () => <PageHeaderDesktop onLogoutClick={action('logout clicked')} openUploadModal={action('modal opened')} />);
