/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import ContentWrapper from 'atoms/ContentWrapper';
import PublicGalleryHeaderDesktop from 'molecules/PublicGalleryHeaderDesktop';
import ScrollHeaderMobile from 'molecules/ScrollHeaderMobile';
import ContactModal from 'containers/ContactModal';
import ArtworksGridView from 'organisms/ArtworksGridView';
import BurgerDrawerModal from 'containers/BurgerDrawerModal';
import Typography from 'atoms/Typography';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';
import authService from 'services/auth';
import * as analyticsEvents from 'constants/analytics';
import { SOCIAL_LINKS } from 'constants/users';

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

const TitleAndBioWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  margin-bottom: 1.3125rem;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    text-align: center;
    padding: 0 1rem;
  }
`;

const GridWrapper = styled.div`
  margin-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.palette.gray[30]};
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    margin-top: 6rem;
    border-top: none;
    padding: 0 .5rem;
  }
`;

class ArtistPublicCollectionsView extends Component {
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

  RenderInfo = ({ isMobile, selectedCollection }) => {
    return (
      <TitleAndBioWrapper>
        <Typography
          fontSize="24px"
          type="h3"
          weight="800"
          color="#121212"
        >
          {selectedCollection.name}
        </Typography>
        <Typography
          fontSize="15px"
          color="#5C5C5C"
          style={{
            marginTop: isMobile && '0.5rem',
        }}
          color="#5E5960"
          lineHeight={isMobile ? '1.25rem' : '1.6875rem'}
        >
          {selectedCollection.description}
        </Typography>
      </TitleAndBioWrapper>
    );
  }

  handleCollectionRequest = () => {
    const { collectionsSingleCollectionFetchRequest, match } = this.props;
    collectionsSingleCollectionFetchRequest(match.params.collectionUrl);
  };

  handleArtworkClick = (artworkId) => {
    const { match: { params }, pushPage } = this.props;

    pushPage(`/${params.userName}/collections/${params.collectionUrl}/artwork/${artworkId}`);
  }

  render() {
    const {
      publicUserInfo, publicUserInfo: {
        pages = [], social_links: socialLinks = [], first_name: firstName,
        last_name: lastName, marcel_username: userName, bio,
      }, match, openBurgerModal, selectedCollection, statusSelectedCollection, collectionsArtworks
    } = this.props;
    const name = `${firstName || ''} ${lastName || ''}`;

    const RenderInfo = this.RenderInfo;

    const sc = selectedCollection[match.params.collectionUrl];

    const artworksData = !_.isEmpty(sc) && !_.isEmpty(collectionsArtworks) && collectionsArtworks[sc.id];
    

    return (
      <Container>
        {this.renderContactModal()}
        <BurgerDrawerModal match={match} />
        <Header
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          name={name}
          primaryImage={publicUserInfo.thumbnails ? publicUserInfo.thumbnails.mid : null}
          bio={publicUserInfo.bio}
          socialLinks={socialLinks}
          onContactButtonClick={this.handleContactButtonClick}
          onSocialMediaLinkClick={this.handleSocialMediaIconClick}
          openBurgerModal={openBurgerModal}
          match={match}
          pages={pages}
        />
        <GridWrapper>
          {(sc && Boolean(Array.isArray(sc.artworks))) && (sc.artist === name) && sc.artworks[0]
            ? (
              <Fragment>

                <RenderInfo 
                  selectedCollection={sc}
                  bio={bio} />
                <ArtworksGridView
                  artworks={sc.artworks.map((artwork) => ({ ...artwork, ...artwork.artwork_data }))}
                  artworksData={artworksData}
                  hideControls
                  hideHeader
                  noWrapper
                  hideArtworksMeta
                  onArtworkClick={this.handleArtworkClick}
                  isFetching={statusSelectedCollection.isLoading}
                  isCollection
                  requestArtworks={this.handleCollectionRequest}
                  artworksMeta={{}}
                />
              </Fragment>
            )
            : (
              <Typography color="muted" type="h4">
                Collection not found
              </Typography>
            )}
        </GridWrapper>
      </Container>
    );
  }
}

ArtistPublicCollectionsView.propTypes = {
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
  selectedCollection: PropTypes.shape({
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
  }),
  statusSelectedCollection: PropTypes.shape({
    isLoading: PropTypes.bool,
    hasNeverLoaded: PropTypes.bool,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      userName: PropTypes.string,
      collectionUrl: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
  openContactModal: PropTypes.func.isRequired,
  openBurgerModal: PropTypes.func.isRequired,
  pushPage: PropTypes.func.isRequired,
  collectionsSingleCollectionFetchRequest: PropTypes.func.isRequired,
};

export default ArtistPublicCollectionsView;
