import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SocialMediaIcons from './SocialMediaIcons';

storiesOf('molecules/SocialMediaIcons', module)
  .add('default', () => <SocialMediaIcons facebook="facebook" instagram="instagram" linkedIn="linkedIn" onSocialMediaLinkClick={() => action('clicked')} />);
