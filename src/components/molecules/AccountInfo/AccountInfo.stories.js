import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AccountInfo from './AccountInfo';
import TestImage from '../../atoms/Icon/cloud.svg';

storiesOf('molecules/AccountInfo', module)
  .add('default', () => <AccountInfo onLogoutClick={action('logout clicked')} />)
  .add('with src and name', () => <AccountInfo src={TestImage} name="Custom Name" onLogoutClick={action('logout clicked')} />);
