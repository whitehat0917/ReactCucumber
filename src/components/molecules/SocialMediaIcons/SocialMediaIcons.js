import React from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import styled from 'styled-components';
import Icon from 'atoms/Icon';

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;

  ${({ isMobile }) => (isMobile ? `
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    justify-content: center;
  ` : `
    margin-top: 1.5rem;
  `)}
`;

const SocialMediaIcons = ({
  facebook, linkedIn, instagram, onSocialMediaLinkClick,
}) => (
  <Responsive maxDeviceWidth={991}>
    {(isMobile) => (
      <IconsWrapper isMobile={isMobile}>
        {
          facebook && facebook.handle && (
            <Icon
              clickable
              onClick={onSocialMediaLinkClick(facebook)}
            >
              facebook_link
            </Icon>
          )
        }
        {
          instagram && instagram.handle && (
            <Icon
              clickable
              onClick={onSocialMediaLinkClick(instagram)}
              style={{ marginLeft: isMobile ? '1.98rem' : '2.31rem' }}
            >
              instagram_link
            </Icon>
          )
        }
        {
          linkedIn && linkedIn.handle && (
            <Icon
              clickable
              onClick={onSocialMediaLinkClick(linkedIn)}
              style={{ marginLeft: isMobile ? '1.98rem' : '2.31rem' }}
            >
              linkedin_link
            </Icon>
          )
        }
      </IconsWrapper>
    )}
  </Responsive>
);

SocialMediaIcons.propTypes = {
  facebook: PropTypes.shape({
    id: PropTypes.number,
    provider: PropTypes.number,
    handle: PropTypes.string,
  }),
  linkedIn: PropTypes.shape({
    id: PropTypes.number,
    provider: PropTypes.number,
    handle: PropTypes.string,
  }),
  instagram: PropTypes.shape({
    id: PropTypes.number,
    provider: PropTypes.number,
    handle: PropTypes.string,
  }),
  onSocialMediaLinkClick: PropTypes.func.isRequired,
};

export default SocialMediaIcons;
