import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from 'atoms/Avatar';
import Typography from 'atoms/Typography';
import Button from 'components/atoms/Button';
import SocialMediaIcons from 'components/molecules/SocialMediaIcons';
import { SOCIAL_LINKS } from 'constants/users';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccountInfoWrapper = styled.div`
  display: flex;
  flex-shrink: 1;
`;

const DescriptionWrapper = styled.div`
  margin-left: 1.25rem;
`;

const ContactActionsWrapper = styled.div`
  width: 18.5rem;
  display: flex;
  flex-direction: column;
`;

const PublicGalleryHeaderDesktop = ({
  firstName, lastName, primaryImage, bio, onContactButtonClick, onSocialMediaLinkClick, socialLinks,
}) => (
  <HeaderWrapper>
    <AccountInfoWrapper>
      <Avatar type="square" src={primaryImage} />
      <DescriptionWrapper>
        <Typography
          type="h3"
          id="userName"
          style={{ fontSize: '1.875rem', fontWeight: 600 }}
        >
          {`${firstName || ''} ${lastName || ''}`}
        </Typography>
        <Typography style={{ marginTop: '0.5rem', opacity: 0.7 }} color="#5E5960">{bio}</Typography>
      </DescriptionWrapper>
    </AccountInfoWrapper>
    <ContactActionsWrapper>
      <Button
        fullWidth
        onClick={onContactButtonClick}
        style={{
          marginBottom: '0.25rem',
        }}
      >
          Contact Artist
      </Button>
      <SocialMediaIcons
        facebook={socialLinks.find((link) => link.provider === SOCIAL_LINKS.FACEBOOK.provider)}
        linkedIn={socialLinks.find((link) => link.provider === SOCIAL_LINKS.LINKEDIN.provider)}
        instagram={socialLinks.find((link) => link.provider === SOCIAL_LINKS.INSTAGRAM.provider)}
        onSocialMediaLinkClick={onSocialMediaLinkClick}
      />
    </ContactActionsWrapper>
  </HeaderWrapper>
);

// PublicGalleryHeaderDesktop.defaultProps = {
//   socialLinks: [],
// };

// PublicGalleryHeaderDesktop.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   primaryImage: PropTypes.string,
//   bio: PropTypes.string,
//   socialLinks: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     provider: PropTypes.number,
//     handle: PropTypes.string,
//   })),
//   onContactButtonClick: PropTypes.func.isRequired,
//   onSocialMediaLinkClick: PropTypes.func.isRequired,
// };

export default PublicGalleryHeaderDesktop;
