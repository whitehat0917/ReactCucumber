/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Responsive from 'react-responsive';
import ArtistBioHeaderDesktop from 'molecules/ArtistBioHeaderDesktop';
import PublicGalleryHeaderMobile from 'molecules/PublicGalleryHeaderMoblie';
import MarkdownParser from 'atoms/MarkdownParser';
import FeaturedLink from 'molecules/FeaturedLink';
import Button from 'atoms/Button';
import ContactModal from 'containers/ContactModal';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';
import authService from 'services/auth';
import * as analyticsEvents from 'constants/analytics';
import { SOCIAL_LINKS, PAGE_TYPE } from 'constants/users';

import {
  AboutTitle,
  AboutBio,
  AboutImage,
  FeaturedTitle,
  Wrapper,
  DescriptionWrapper,
  FeaturedLinksWrapper,
} from './styled';

const Desktop = (props) => <Responsive {...props} minWidth={992} />;
const Tablet = (props) => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = (props) => <Responsive {...props} maxWidth={767} />;

const Header = (props) => (
  <Fragment>
    <Desktop>
      <ArtistBioHeaderDesktop {...props} />
    </Desktop>
    <Tablet>
      <PublicGalleryHeaderMobile {...props} />
    </Tablet>
    <Mobile>
      <PublicGalleryHeaderMobile {...props} />
    </Mobile>
  </Fragment>
);


class ArtistPublicBio extends Component {
  handleContactButtonClick = () => {
    this.props.openContactModal();

    if (!authService.isImpersonated()) {
      customAnalyticsService.trackGA('Contact', 'Contact', analyticsEvents.CONTACT_ARTIST_CLICKED);
      userAnalyticsService.event({
        category: 'Contact',
        action: analyticsEvents.CONTACT_ARTIST_CLICKED,
      });
    }
  };

  handleSocialMediaIconClick = ({ provider, handle }) => () => {
    let url = 'https://';
    switch (provider) {
      case SOCIAL_LINKS.INSTAGRAM.provider:
        url += `www.instagram.com/${handle}`;
        break;
      case SOCIAL_LINKS.FACEBOOK.provider:
        url += `www.facebook.com/${handle}`;
        break;
      case SOCIAL_LINKS.LINKEDIN.provider:
        url += `www.linkedin.com/in/${handle}`;
        break;
      default:
        break;
    }
    return window.open(url, '_blank', 'noreferrer');
  };

  handleExploreArtworksButtonClick = () => {
    const { publicUserInfo, pushPage } = this.props;
    return pushPage(`/${publicUserInfo.marcel_username}`);
  };

  renderContactModal = () => {
    const {
      publicUserInfo: {
        first_name, last_name,
      },
    } = this.props;
    return <ContactModal person={`${first_name}\xa0${last_name}`} />;
  }

  render() {
    const {
      publicUserInfo, publicUserInfo: {
        pages = [], featured_links: featuredLinks = [], social_links: socialLinks = [],
      }, match, openBurgerModal,
    } = this.props;
    const aboutPage = pages.find((page) => page.page_type === PAGE_TYPE.ABOUT_PAGE) || {};
    const aboutPageContent = featuredLinks.length
      ? ` ${aboutPage.content} `
      : aboutPage.content;

    // console.log('publicUserInfo -> ', publicUserInfo);

    return (
      <Wrapper>
        {this.renderContactModal()}
        <Header
          firstName={publicUserInfo.first_name}
          lastName={publicUserInfo.last_name}
          userName={publicUserInfo.marcel_username}
          primaryImage={publicUserInfo.thumbnails ? publicUserInfo.thumbnails.mid : null}
          bio={publicUserInfo.bio}
          socialLinks={socialLinks}
          onContactButtonClick={this.handleContactButtonClick}
          onSocialMediaLinkClick={this.handleSocialMediaIconClick}
          openBurgerModal={openBurgerModal}
          match={match}
          pages={pages}
        />
        {
          aboutPage && aboutPage.content && (
            <Fragment>
              <DescriptionWrapper>
                <AboutTitle>About</AboutTitle>
                <AboutBio>{publicUserInfo.bio}</AboutBio>
              </DescriptionWrapper>
              <AboutImage src={publicUserInfo.primary_image_signed} />
              <DescriptionWrapper>
                <MarkdownParser source={aboutPageContent} />
                {
                  featuredLinks.length && (
                    <FeaturedLinksWrapper>
                      <FeaturedTitle>Featured Links</FeaturedTitle>
                      {
                        featuredLinks.map((link) => <FeaturedLink key={link.id} {...link} />)
                      }
                    </FeaturedLinksWrapper>
                  )
                }
                <Responsive minDeviceWidth={992}>
                  {(isDesktop) => isDesktop && (
                    <Button
                      fullWidth
                      styleType="outlined"
                      onClick={this.handleExploreArtworksButtonClick}
                      style={{
                        marginTop: '4.56rem',
                        color: '#FF5B00',
                        borderColor: '#FF5B00',
                      }}
                    >
                      Explore Artworks
                    </Button>
                  )}
                </Responsive>
              </DescriptionWrapper>
            </Fragment>
          )
        }
      </Wrapper>
    );
  }
}

ArtistPublicBio.propTypes = {
  publicUserInfo: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    thumbnails: PropTypes.shape({
      mid: PropTypes.string,
    }),
    social_links: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      provider: PropTypes.number,
      handle: PropTypes.string,
    })),
    pages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      page_type: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
    })),
    marcel_username: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
  openContactModal: PropTypes.func.isRequired,
  openBurgerModal: PropTypes.func.isRequired,
  pushPage: PropTypes.func.isRequired,
};

export default ArtistPublicBio;
