/* eslint-disable camelcase */
import { FetchStaus } from 'app/global-types';
// import { AboutBio } from '../ArtistPublicBio/styled';
import { TImage } from 'features/artwork/artwork-type';
import { TCollection } from 'features/collection/collection-types';
import { useQueryString } from 'features/core/hooks/useQueryString';
import React, { Fragment } from 'react';
import { MTitle, Skeleton, TitleHolder } from 'styled';
// import Responsive from 'react-responsive';
// Actions -------------------------------------------------------
// import { modalOpen } from 'store/actions';
// Components -----------------------------------------------------
// import RenderArtistBio from './RenderArtistBio';
// import ArtistBioHeaderDesktop from 'molecules/ArtistBioHeaderDesktop';
// import PublicGalleryHeaderMobile from 'molecules/PublicGalleryHeaderMoblie';
// Services ------------------------------------------------------
// import userAnalyticsService from 'services/user_analytics';
// import customAnalyticsService from 'services/custom_analytics';
// import authService from 'services/auth';
// import * as analyticsEvents from 'constants/analytics';
// import { SOCIAL_LINKS } from 'constants/users';
// Styled ---------------------------------------------------------
import { TUserInfo } from '../user-types';
import ArtistHomeCollections from './ArtistHomeCollections';
import RenderSocialLinks, { TLink } from './RenderSocialLinks';
import {
  ArtistHomeHolder,
  ArtistHomeImage,
  ArtistHomeTitle,
  ArtistImageHolder,
  ArtistSocialLink,
  CollectionsHolder,
  HomeContentHolder,
  IntroHolder,
  IntroText,
  MainImage,
  MainImageDiv,
  SocialLinksHolder,
  TopContentHolder,
} from './styled';

// const Desktop = (props) => <Responsive {...props} minWidth={992} />;
// const Tablet = (props) => <Responsive {...props} minWidth={768} maxWidth={991} />;
// const Mobile = (props) => <Responsive {...props} maxWidth={767} />;

// const Header = (props) => (
//   <Fragment>
//     <Desktop>
//       <ArtistBioHeaderDesktop {...props} />
//     </Desktop>
//     <Tablet>
//       <PublicGalleryHeaderMobile {...props} />
//     </Tablet>
//     <Mobile>
//       <PublicGalleryHeaderMobile {...props} />
//     </Mobile>
//   </Fragment>
// );

// const handleSocialMediaIconClick = ({ provider, handle }) => () => {
//   const url = 'https://';

//   switch (provider) {
//     case SOCIAL_LINKS.INSTAGRAM.provider:
//       return window.open(`${url}www.instagram.com/${handle}`, '_blank', 'noreferrer');
//     case SOCIAL_LINKS.FACEBOOK.provider:
//       return window.open(`${url}www.facebook.com/${handle}`, '_blank', 'noreferrer');
//     case SOCIAL_LINKS.LINKEDIN.provider:
//       return window.open(`${url}www.linkedin.com/in/${handle}`, '_blank', 'noreferrer');
//     default:
//       break;
//   }
// };

// const handleContactButtonClick = () => {
//   // const dispatch = useDispatch();
//     // dispatch(modalOpen('contact'));

//     if (!authService.isImpersonated()) {
//         customAnalyticsService.trackGA('Contact', 'Contact', analyticsEvents.CONTACT_ARTIST_CLICKED);
//         userAnalyticsService.event({
//         category: 'Contact',
//         action: analyticsEvents.CONTACT_ARTIST_CLICKED,
//       });
//     }
// };

interface IArtistHome {
  publicInfo: TUserInfo;
  image: TImage;
  collections: TCollection[];
  collectionsStatus: FetchStaus;
  socialLinks: TLink[];
  isLoading: boolean;
  isEmptyCollections: boolean;
}

const RenderMainImage = ({ image, isLoading }) => {
  const { platform } = useQueryString();
  if (!image && isLoading) {
    return <Skeleton height="60vh" />;
  }

  if (!image && !isLoading) {
    return null;
  }
  // alert(image.thumbnails.mid);
  if (platform === 'android') {
    return <MainImageDiv image={image} />;
  }
  return <MainImage src={image.thumbnails.mid} />;
};

const RenderTitle = ({ publicInfo, isLoading }) => {
  if (!publicInfo || isLoading) {
    return (
      <Fragment>
        <TitleHolder margin="0 0 38">
          <Skeleton width="350px" height="44px" />
        </TitleHolder>
        <IntroHolder>
          <Skeleton width="250px" />
        </IntroHolder>
      </Fragment>
    );
  }

  if (!publicInfo && !isLoading) {
    return null;
  }

  return (
    <Fragment>
      <TitleHolder margin="0 0 38">
        <MTitle fontSize="36" lineHeight="44">
          {publicInfo.bio}
        </MTitle>
      </TitleHolder>
      <IntroHolder>
        <IntroText>{publicInfo.intro}</IntroText>
      </IntroHolder>
    </Fragment>
  );
};

const ArtistHome: React.FC<IArtistHome> = ({
  isLoading,
  publicInfo,
  image,
  collections,
  collectionsStatus,
  socialLinks,
  isEmptyCollections,
}) => {
  return (
    <HomeContentHolder>
      <TopContentHolder>
        <ArtistImageHolder className="clearfix">
          <ArtistHomeImage>
            <RenderMainImage image={image} isLoading={isLoading} />
          </ArtistHomeImage>
        </ArtistImageHolder>
        <ArtistHomeHolder>
          {/* <RenderContactModal publicUserInfo={publicInfo} />
                    <Header
                        firstName={publicInfo.first_name}
                        lastName={publicInfo.last_name}
                        userName={publicInfo.marcel_username}
                        primaryImage={publicInfo.thumbnails ? publicInfo.thumbnails.mid : null}
                        bio={publicInfo.bio}
                        socialLinks={publicInfo.social_links}
                        onContactButtonClick={handleContactButtonClick}
                        onSocialMediaLinkClick={handleSocialMediaIconClick}
                        openBurgerModal={dispatch(modalOpen('burger'))}
                        // match={match}
                        pages={publicInfo.pages}
                    />
                    */}
          <RenderTitle publicInfo={publicInfo} isLoading={isLoading} />
          <SocialLinksHolder>
            <RenderSocialLinks
              withIcon
              width="250px"
              margin="0 0 26px"
              isLoading={isLoading}
              linkComponent={ArtistSocialLink}
              socialLinks={socialLinks}
            />
          </SocialLinksHolder>
        </ArtistHomeHolder>
      </TopContentHolder>
      <ArtistHomeTitle>Collections</ArtistHomeTitle>
      <CollectionsHolder>
        <ArtistHomeCollections
          collections={collections}
          collectionsStatus={collectionsStatus}
          userName={publicInfo.marcel_username}
          isEmptyCollections={isEmptyCollections}
        />
      </CollectionsHolder>
    </HomeContentHolder>
  );
};

// ArtistPublicBio.propTypes = {
//   publicUserInfo: PropTypes.shape({
//     first_name: PropTypes.string,
//     last_name: PropTypes.string,
//     thumbnails: PropTypes.shape({
//       mid: PropTypes.string,
//     }),
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
//     marcel_username: PropTypes.string,
//   }).isRequired,
//   match: PropTypes.shape({
//     url: PropTypes.string,
//   }),
//   openContactModal: PropTypes.func.isRequired,
//   openBurgerModal: PropTypes.func.isRequired,
//   pushPage: PropTypes.func.isRequired,
// };

export default ArtistHome;
