/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import ContentWrapper from 'atoms/ContentWrapper';
import PublicGalleryHeaderDesktop from 'molecules/PublicGalleryHeaderDesktop';
import ScrollHeaderMobile from 'molecules/ScrollHeaderMobile';
import ContactModal from 'containers/ContactModal';
// import ArtworksCollectionCard from 'molecules/ArtworksCollectionCard';
import BurgerDrawerModal from 'containers/BurgerDrawerModal';
import Link from 'atoms/Link';
import Icon from 'atoms/Icon';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';
import authService from 'services/auth';
import * as analyticsEvents from 'constants/analytics';
import { SOCIAL_LINKS } from 'constants/users';
import Typography from '../../atoms/Typography/Typography';
import MinorLoader from 'components/atoms/MinorLoader';
import VisibilitySensor from 'react-visibility-sensor';

const Desktop = (props) => <Responsive {...props} minWidth={992} />;
const Tablet = (props) => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = (props) => <Responsive {...props} maxWidth={767} />;

const Header = (props) => (
  <Fragment>
    <Desktop>
      <PublicGalleryHeaderDesktop {...props} />
    </Desktop>
    <Tablet>
      <ScrollHeaderMobile {...props} />
    </Tablet>
    <Mobile>
      <ScrollHeaderMobile {...props} />
    </Mobile>
  </Fragment>
);

const MobileContentWrapper = styled(ContentWrapper)`
  padding: 0 0 0.5rem;
`;

const Container = (props) => (
  <Fragment>
    <Desktop>
      <ContentWrapper withPaddings {...props} />
    </Desktop>
    <Tablet>
      <MobileContentWrapper {...props} />
    </Tablet>
    <Mobile>
      <MobileContentWrapper {...props} />
    </Mobile>
  </Fragment>
);

const Wrapper = styled.section`
  margin: 5.1875rem 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media screen and (max-width: 991px) {
    padding: 1.25rem;
    margin: 0.625rem 0;
  }
`;

const MobileLinkAndTitleWrapper = styled.div`
  margin-top: 6.25rem;
  padding: 0 1.25rem;
  width: 100%;
  box-sizing: border-box;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const CollectionLink = styled(Link)`
  margin: 0 2% 2% 0;
  width: 23.5%;

  @media screen and (min-width: 1401px) {
    &:nth-child(4n) {
      margin: 0 0 2% 0;
    }
  }

  @media screen and (max-width: 1400px) {
    width: 32%;

    &:nth-child(3n) {
      margin: 0 0 2% 0;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 32%;
  }

  @media screen and (max-width: 767px) {
    width: 48%;

    &:nth-child(3n) {
      margin: 0 2% 2% 0;
    }

    &:nth-child(2n) {
      margin: 0 0 2% 0;
    }
  }
`;

class ArtistPublicCollections extends Component {
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

  renderContactModal = () => {
    const {
      publicUserInfo: {
        first_name, last_name,
      },
    } = this.props;
    return <ContactModal person={`${first_name}\xa0${last_name}`} />;
  }

  handleLoadMore = (isVisible) => {
    const { collectionsLoadMore, collections, hasMore } = this.props;

    if (isVisible) {
      // console.log('handleLoadMore -> ', isVisible);
      // console.log('hasMore -> ', hasMore);

      // collectionsLoadMore(collections.length);
    }
  }

  render() {
    const {
      publicUserInfo, publicUserInfo: {
        pages = [], social_links: socialLinks = [], first_name: firstName,
        last_name: lastName, marcel_username: userName,
      }, match, openBurgerModal, collections, hasMore,
    } = this.props;

    // console.log('collections -> ', collections);

    return (
      <Container>
        {this.renderContactModal()}
        <BurgerDrawerModal match={match} />
        <Header
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          name={`${firstName || ''} ${lastName || ''}`}
          primaryImage={publicUserInfo.thumbnails ? publicUserInfo.thumbnails.mid : null}
          bio={publicUserInfo.bio}
          socialLinks={socialLinks}
          onContactButtonClick={this.handleContactButtonClick}
          onSocialMediaLinkClick={this.handleSocialMediaIconClick}
          openBurgerModal={openBurgerModal}
          match={match}
          pages={pages}
        />

        <Responsive maxWidth={991}>
          <MobileLinkAndTitleWrapper>
            <StyledLink to={`/${userName}`} style={{ fontSize: '1.0625rem' }}>
              <Icon size={1.0625} style={{ marginRight: '0.625rem' }}>arrow_left</Icon>
              Home
            </StyledLink>
            {
              Array.isArray(collections) && collections[0] && (
                <Typography
                  type="subtitle2"
                  style={{ fontWeight: 600, fontSize: '1.5rem', marginLeft: '0.25rem' }}
                >
                  Collections
                </Typography>
              )
            }
          </MobileLinkAndTitleWrapper>
        </Responsive>

        <Wrapper>
          {
            Array.isArray(collections)
              ? collections.map((collection) => (
                <CollectionLink to={`/${userName}/${collection.url}`} key={collection.id}>
                  <ArtworksCollectionCard {...collection} />
                </CollectionLink>
              ))
              : <Typography type="h3">No public collections</Typography>
          }
        </Wrapper>
        {
          (collections.length > 7 && hasMore) && (
            <VisibilitySensor onChange={this.handleLoadMore}>
              <div style={{ height: '30px', marginBottom: '10px' }}>
                <MinorLoader />
              </div>
            </VisibilitySensor>
          )
        }
      </Container>
    );
  }
}

ArtistPublicCollections.propTypes = {
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
  collections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    artworks: PropTypes.arrayOf(PropTypes.shape({
      artwork: PropTypes.string,
      order: PropTypes.number,
      artwork_data: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
        })),
      }),
    })),
  })),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
  openContactModal: PropTypes.func.isRequired,
  openBurgerModal: PropTypes.func.isRequired,
  pushPage: PropTypes.func.isRequired,
};

export default ArtistPublicCollections;
