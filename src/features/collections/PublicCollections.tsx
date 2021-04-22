import { FetchStatus } from 'app/global-types';
import MinorLoader from 'components/MinorLoader';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { Skeleton } from 'styled';
import { v4 } from 'uuid';
import CollectionCard from './CollectionCard';
import { TCollection } from './collections-types';
// Actions ----------------------------------------------------------
import { collectionsLoadMore } from './collectionsSlice';
import { CollectionLink, CollectionsWrapper, EmptyPlaceholder, Title, TitleWrapper, Wrapper } from './styled';

const handleLoadMore = ({ collections, hasMore, dispatch }) => (isVisible) => {
  if (isVisible) {
    // console.log('handleLoadMore -> ', isVisible);
    // console.log('hasMore -> ', hasMore);

    dispatch(
      collectionsLoadMore({
        offset: collections.length,
        collectionsLimit: 8,
        artworksLimit: 4,
      }),
    );
  }
};

const RenderMoreCollections = ({ hasMore, collections, dispatch }) => {
  if (hasMore) {
    return (
      <VisibilitySensor onChange={handleLoadMore({ collections, hasMore, dispatch })}>
        <div style={{ height: '30px', marginBottom: '10px' }}>
          <MinorLoader />
        </div>
      </VisibilitySensor>
    );
  }

  return null;
};

const collectionsMock = [
  {
    id: v4(),
  },
  {
    id: v4(),
  },
  {
    id: v4(),
  },
  {
    id: v4(),
  },
];

export const RenderCollections = ({ collections, userName, isLoading, isEmptyCollections }) => {
  console.log('status render coll', isLoading);
  if (!collections.length && isLoading) {
    return collectionsMock.map((c) => (
      <CollectionLink to={`/`} key={c.id}>
        <Skeleton height="200%" />
      </CollectionLink>
    ));
  }

  if (isEmptyCollections) {
    return <EmptyPlaceholder>No public collections</EmptyPlaceholder>;
  }

  return collections.map((collection) => (
    <CollectionLink to={`/${userName}/collections/${collection.url}`} key={v4()}>
      <CollectionCard {...collection} />
    </CollectionLink>
  ));
};

export interface IArtistPublicCollections {
  collections: TCollection[];
  collectionsStatus: FetchStatus;
  hasMore: boolean;
  isEmptyCollections: boolean;
}

const TITLE = 'Collections';

const PublicCollections: React.FC<IArtistPublicCollections> = ({
  collections,
  collectionsStatus,
  hasMore,
  isEmptyCollections,
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  console.log('status', collectionsStatus, collectionsStatus?.isLoading);
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{TITLE}</Title>
      </TitleWrapper>
      <CollectionsWrapper>
        <RenderCollections
          isEmptyCollections={isEmptyCollections}
          collections={collections}
          isLoading={collectionsStatus?.isLoading}
          userName={params.userName}
        />
      </CollectionsWrapper>
      <RenderMoreCollections hasMore={hasMore} collections={collections} dispatch={dispatch} />
    </Wrapper>
  );
};

// class ArtistPublicCollections extends Component {
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

//   renderContactModal = () => {
//     const {
//       publicUserInfo: {
//         first_name, last_name,
//       },
//     } = this.props;
//     return <ContactModal person={`${first_name}\xa0${last_name}`} />;
//   }

//   handleLoadMore = (isVisible) => {
//     const { collectionsLoadMore, collections, hasMore } = this.props;

//     if (isVisible) {
//       // console.log('handleLoadMore -> ', isVisible);
//       // console.log('hasMore -> ', hasMore);

//       // collectionsLoadMore(collections.length);
//     }
//   }

//   render() {
//     const {
//       publicUserInfo, publicUserInfo: {
//         pages = [], social_links: socialLinks = [], first_name: firstName,
//         last_name: lastName, marcel_username: userName,
//       }, match, openBurgerModal, collections, hasMore,
//     } = this.props;

//     // console.log('collections -> ', collections);

//     return (
//       <Container>
//         {this.renderContactModal()}
//         <BurgerDrawerModal match={match} />
//         <Header
//           firstName={firstName}
//           lastName={lastName}
//           userName={userName}
//           name={`${firstName || ''} ${lastName || ''}`}
//           primaryImage={publicUserInfo.thumbnails ? publicUserInfo.thumbnails.mid : null}
//           bio={publicUserInfo.bio}
//           socialLinks={socialLinks}
//           onContactButtonClick={this.handleContactButtonClick}
//           onSocialMediaLinkClick={this.handleSocialMediaIconClick}
//           openBurgerModal={openBurgerModal}
//           match={match}
//           pages={pages}
//         />

//         <Responsive maxWidth={991}>
//           <MobileLinkAndTitleWrapper>
//             <StyledLink to={`/${userName}`} style={{ fontSize: '1.0625rem' }}>
//               <Icon size={1.0625} style={{ marginRight: '0.625rem' }}>arrow_left</Icon>
//               Home
//             </StyledLink>
//             {
//               Array.isArray(collections) && collections[0] && (
//                 <Typography
//                   type="subtitle2"
//                   style={{ fontWeight: 600, fontSize: '1.5rem', marginLeft: '0.25rem' }}
//                 >
//                   Collections
//                 </Typography>
//               )
//             }
//           </MobileLinkAndTitleWrapper>
//         </Responsive>

//       </Container>
//     );
//   }
// }

// ArtistPublicCollections.propTypes = {
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
//   collections: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     artworks: PropTypes.arrayOf(PropTypes.shape({
//       artwork: PropTypes.string,
//       order: PropTypes.number,
//       artwork_data: PropTypes.shape({
//         images: PropTypes.arrayOf(PropTypes.shape({
//           id: PropTypes.string,
//         })),
//       }),
//     })),
//   })),
//   match: PropTypes.shape({
//     url: PropTypes.string,
//   }),
//   openContactModal: PropTypes.func.isRequired,
//   openBurgerModal: PropTypes.func.isRequired,
//   pushPage: PropTypes.func.isRequired,
// };

export default PublicCollections;
