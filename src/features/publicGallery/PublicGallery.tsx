/* eslint-disable camelcase */
import ArtworksGrid from 'features/artwork/ArtworksPublicGallery';
import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import Responsive from 'react-responsive';
// import Typography from 'atoms/Typography';
// import ContentWrapper from 'atoms/ContentWrapper';
// import ArtworksGridView from 'organisms/ArtworksGridView';
// import ArtworkView from 'containers/ArtworkView';
// import PublicGalleryHeaderMobile from 'molecules/PublicGalleryHeaderMoblie';
// import PublicGalleryHeaderDesktop from 'molecules/PublicGalleryHeaderDesktop';
// import userAnalyticsService from 'services/user_analytics';
// import customAnalyticsService from 'services/custom_analytics';
// import authService from 'services/auth';
// import * as analyticsEvents from 'constants/analytics';
// import { SOCIAL_LINKS } from 'constants/users';
import { GridWrapper } from './styled';

// const Desktop = (props) => <Responsive {...props} minWidth={992} />;
// const Tablet = (props) => <Responsive {...props} minWidth={768} maxWidth={991} />;
// const Mobile = (props) => <Responsive {...props} maxWidth={767} />;

// const Header = (props) => (
//   <Fragment>
//     <Desktop>
//       <PublicGalleryHeaderDesktop {...props} />
//     </Desktop>
//     <Tablet>
//       <PublicGalleryHeaderMobile {...props} />
//     </Tablet>
//     <Mobile>
//       <PublicGalleryHeaderMobile {...props} />
//     </Mobile>
//   </Fragment>
// );

// const Container = (props) => (
//   <Fragment>
//     <Desktop>
//       <ContentWrapper withPaddings {...props} />
//     </Desktop>
//     <Tablet>
//       <MobileContentWrapper {...props} />
//     </Tablet>
//     <Mobile>
//       <MobileContentWrapper {...props} />
//     </Mobile>
//   </Fragment>
// );

const ArtworksPublicGallery = ({
  artworks,
  hasMore,
  // statusPublicArtworks,
  // publicUserInfo,
  // requestPublicArtworks,
  // artworksMeta,
  // match,
  // openBurgerModal,
  // artwork
}) => {
  return (
    <Fragment>
      {/* <ArtworkView
                onLoad={this.handleArtworkLoad}
                onContactButtonClick={this.handleContactButtonClick}
                publicUserInfo={publicUserInfo}
            />
            {this.renderContactModal()} */}
      <GridWrapper>
        {/* {(!statusPublicArtworks.isLoading && !statusPublicArtworks.hasNeverLoaded) && !artworks.length && (
                    <Typography color="muted" type="h4">
                        No artworks found
                    </Typography>
                )} */}
        {artworks.length && (
          <ArtworksGrid
            artworks={artworks}
            // hideControls
            // hideHeader
            // noWrapper
            // hideArtworksMeta
            // onArtworkClick={this.handleArtworkClick}
            // isFetching={statusPublicArtworks.isLoading}
            // requestArtworks={requestPublicArtworks}
            // artworksMeta={artworksMeta}
          />
        )}
      </GridWrapper>
    </Fragment>
  );
};

//     class ArtworksPublicGallery extends Component {
//   handleContactButtonClick = () => {
//     this.props.openContactModal();

//     if (!authService.isImpersonated()) {
//       customAnalyticsService.trackGA('Contact', 'Contact', analyticsEvents.CONTACT_ARTIST_CLICKED);
//       userAnalyticsService.event({
//         category: 'Contact',
//         action: analyticsEvents.CONTACT_ARTIST_CLICKED,
//       });
//     }
//   };

//   handleArtworkClick = (artworkId) => {
//     const { pushPage, match, artworksClickToViewMetadata } = this.props;

//     artworksClickToViewMetadata();
//     pushPage(`/${match.params.userName}/artwork/${artworkId}`);
//   };

//   handleSocialMediaIconClick = ({ provider, handle }) => () => {
//     let url = 'https://';
//     switch (provider) {
//       case SOCIAL_LINKS.INSTAGRAM.provider:
//         url += `www.instagram.com/${handle}`;
//         break;
//       case SOCIAL_LINKS.FACEBOOK.provider:
//         url += `www.facebook.com/${handle}`;
//         break;
//       case SOCIAL_LINKS.LINKEDIN.provider:
//         url += `www.linkedin.com/in/${handle}`;
//         break;
//       default:
//         break;
//     }
//     return window.open(url, '_blank', 'noreferrer');
//   };

//   handleArtworkLoad = () => {
//     const { statusPublicArtworks, requestPublicArtworks } = this.props;
//     if (statusPublicArtworks.hasNeverLoaded) {
//       requestPublicArtworks();
//     }
//   }

//   renderContactModal = () => {
//     const {
//       publicUserInfo: {
//         first_name, last_name,
//       },
//     } = this.props;
//     return <ContactModal person={`${first_name}\xa0${last_name}`} />;
//   }

//   render() {
//     const {
//       artworks, statusPublicArtworks, publicUserInfo,
//       requestPublicArtworks, artworksMeta, match, openBurgerModal, artwork
//     } = this.props;

//     console.log('publicUserInfo -> ', publicUserInfo);

//     return (
//       <Container>
//         <ArtworkView
//           onLoad={this.handleArtworkLoad}
//           onContactButtonClick={this.handleContactButtonClick}
//           publicUserInfo={publicUserInfo}
//         />
//         {this.renderContactModal()}
//         <Header
//           firstName={publicUserInfo.first_name}
//           lastName={publicUserInfo.last_name}
//           userName={publicUserInfo.marcel_username}
//           primaryImage={publicUserInfo.thumbnails ? publicUserInfo.thumbnails.mid : null}
//           bio={publicUserInfo.bio}
//           socialLinks={publicUserInfo.social_links}
//           onContactButtonClick={this.handleContactButtonClick}
//           onSocialMediaLinkClick={this.handleSocialMediaIconClick}
//           openBurgerModal={openBurgerModal}
//           match={match}
//           pages={publicUserInfo.pages}
//         />
//         <GridWrapper>
//           {(!statusPublicArtworks.isLoading && !statusPublicArtworks.hasNeverLoaded) && !artworks.length && (
//             <Typography color="muted" type="h4">
//               No artworks found
//             </Typography>
//           )}
//           {Boolean(artworks.length) && (
//             <ArtworksGridView
//               artworks={artworks}
//               hideControls
//               hideHeader
//               noWrapper
//               hideArtworksMeta
//               onArtworkClick={this.handleArtworkClick}
//               isFetching={statusPublicArtworks.isLoading}
//               requestArtworks={requestPublicArtworks}
//               artworksMeta={artworksMeta}
//             />
//           )}
//         </GridWrapper>
//       </Container>
//     );
//   }
// }

// ArtworksPublicGallery.propTypes = {
//   publicUserInfo: PropTypes.shape({
//     first_name: PropTypes.string,
//     last_name: PropTypes.string,
//     primary_image_signed: PropTypes.string,
//     bio: PropTypes.string,
//     social_links: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number,
//       provider: PropTypes.number,
//       handle: PropTypes.string,
//     })),
//     pages: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number,
//       page_type: PropTypes.number,
//       title: PropTypes.string,
//       content: PropTypes.string,
//     })),
//   }).isRequired,
//   openContactModal: PropTypes.func.isRequired,
//   openBurgerModal: PropTypes.func.isRequired,
//   pushPage: PropTypes.func.isRequired,
//   requestPublicArtworks: PropTypes.func.isRequired,
//   artworksMeta: PropTypes.object.isRequired,
//   artworks: PropTypes.array.isRequired,
//   statusPublicArtworks: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
// };

export default ArtworksPublicGallery;
