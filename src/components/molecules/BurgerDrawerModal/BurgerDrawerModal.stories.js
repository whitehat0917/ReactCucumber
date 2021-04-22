import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BurgerDrawerModal from './BurgerDrawerModal';


storiesOf('molecules/BurgerDrawerModal', module)
  .add('default', () => (
    <BurgerDrawerModal
      userName="test_user"
      isOpen
      onClose={action('closed')}
      onPageLinkClick={action('page_clicked')}
      onContactLinkClick={action('contact_clicked')}
      publicUserInfo={{ marcel_username: 'marcel' }}
      match={{ url: '/marcel' }}
    />
  ));
