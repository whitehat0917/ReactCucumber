import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from 'atoms/Avatar';
import Typography from 'atoms/Typography';
import Button from 'components/atoms/Button';
import SocialMediaIcons from 'components/molecules/SocialMediaIcons';
import { SOCIAL_LINKS } from 'constants/users';

const Wrapper = styled.section`
  width: 18.5rem;
  box-sizing: border-box;
  position: fixed;
`;

const ArtistBioHeaderDesktop = ({
  firstName, lastName, primaryImage, onContactButtonClick, socialLinks, onSocialMediaLinkClick,
}) => (
  <Wrapper>
    <Avatar type="square" src={primaryImage} />
    <Typography
      type="h4"
      id="userName"
      style={{
        marginTop: '1.5rem',
        fontWeight: 600,
      }}
    >
      {`${firstName || ''} ${lastName || ''}`}
    </Typography>
    <Button
      fullWidth
      onClick={onContactButtonClick}
      style={{
        marginTop: '0.625rem',
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
  </Wrapper>
);

// ArtistBioHeaderDesktop.defaultProps = {
//   socialLinks: [],
// };

// ArtistBioHeaderDesktop.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   primaryImage: PropTypes.string,
//   socialLinks: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     provider: PropTypes.number,
//     handle: PropTypes.string,
//   })),
//   onContactButtonClick: PropTypes.func.isRequired,
//   onSocialMediaLinkClick: PropTypes.func.isRequired,
// };

export default ArtistBioHeaderDesktop;
