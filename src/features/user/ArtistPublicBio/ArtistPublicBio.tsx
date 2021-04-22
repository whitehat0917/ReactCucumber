/* eslint-disable camelcase */
import React from 'react';
import { TUserInfo } from '../user-types';
// import Responsive from 'react-responsive';
// Actions -------------------------------------------------------
// import { modalOpen } from 'store/actions';
// Components -----------------------------------------------------
import RenderArtistBio from './RenderArtistBio';
// import ArtistBioHeaderDesktop from 'molecules/ArtistBioHeaderDesktop';
// import PublicGalleryHeaderMobile from 'molecules/PublicGalleryHeaderMoblie';
// Services ------------------------------------------------------
// import userAnalyticsService from 'services/user_analytics';
// import customAnalyticsService from 'services/custom_analytics';
// import authService from 'services/auth';
// import * as analyticsEvents from 'constants/analytics';
// import { SOCIAL_LINKS } from 'constants/users';
// Styled ---------------------------------------------------------
import { Wrapper } from './styled';

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

interface IArtistPublicBio {
  publicInfo: TUserInfo;
  isLoading: boolean;
}

const ArtistPublicBio: React.FC<IArtistPublicBio> = ({ publicInfo, isLoading }) => {
  // const dispatch = useDispatch();
  // const { match } = useParams();

  return (
    <Wrapper>
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
      <RenderArtistBio publicInfo={publicInfo} isLoading={isLoading} />
    </Wrapper>
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

export default ArtistPublicBio;
