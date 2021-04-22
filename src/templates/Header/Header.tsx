// import { MenuIcon } from '../../components/Menu';
import ArtistPublicInfo from 'features/artistInfo/ArtistPublicInfo';
import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom';
import EventListener, { withOptions } from 'react-event-listener';
import { useMediaQuery } from 'react-responsive';
import { useRouteMatch } from 'react-router-dom';
// import Avatar from 'atoms/Avatar';
// import Typography from '../../components/Typography';
// import Icon from '../../components/Icon';
// import SocialMediaIcons from '../../components/molecules/SocialMediaIcons';
// import BurgerDrawerModal from '../../components/BurgerDrawerModal';
// import ScrollHeaderMobile from '../../components/ScrollHeaderMobile';
// import { SOCIAL_LINKS } from 'constants/users';
// import {
//     HeaderWrapper,
//     MainAndButtonsWrapper,
//     MainWrapper,
//     NameAndBioWrapper,
//     UserName,
//     ArtistHomeLink,
//     // ContactButtonWrapper,
//     // ContactButton,
//     IconWrapper
// } from './styled';
import { TUserInfo } from '../../features/user/user-types';

const LIMIT_TOP = 10;
let oldOffset = 0;

interface IMarcelHeader {
  publicInfo?: TUserInfo;
  path?: string;
  openBurgerModal?: () => void;
}

const MarcelHeader: React.FC<IMarcelHeader> = () => {
  const [isOpen, setOpen] = useState(false);
  const [hideScrollView, setScrollView] = useState(true);
  const [isScrollUp, setScroll] = useState(false);
  const { path } = useRouteMatch();

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    const isScrollUp = oldOffset < offsetTop;
    oldOffset = offsetTop;

    if (offsetTop >= LIMIT_TOP) {
      setScrollView(false);
      setScroll(isScrollUp);
    } else {
      setScrollView(true);
      setScroll(isScrollUp);
    }
  };

  const handleOpenMenu = (isOpen) => {
    setOpen(isOpen);
  };

  // const userName = `${publicInfo.first_name} ${publicInfo.last_name}`;
  const [, , isHomeAbout] = path.split('/');

  return (
    <Fragment>
      <ArtistPublicInfo
        isOpen={isOpen}
        isDesktop={isDesktop}
        isHomeAbout={isHomeAbout}
        hideScrollView={hideScrollView}
        handleOpenMenu={handleOpenMenu}
      />

      {/* <ScrollHeaderMobile
                openBurgerModal={openBurgerModal}
                name={userName}
                // primaryImage={primaryImage}
                isScrollUp={isScrollUp}
                hideScrollView={hideScrollView}
            /> */}
      <EventListener target={document} onScroll={withOptions(handleScroll, { passive: true, capture: false })} />
      {/* <BurgerDrawerModal match={match} /> */}
    </Fragment>
  );
};

// PublicGalleryHeaderMobile.defaultProps = {
//   socialLinks: [],
// };

// PublicGalleryHeaderMobile.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   primaryImage: PropTypes.string,
//   bio: PropTypes.string,
//   socialLinks: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     provider: PropTypes.number,
//     handle: PropTypes.string,
//   })),
//   match: PropTypes.shape({
//     url: PropTypes.string,
//   }),
//   onContactButtonClick: PropTypes.func.isRequired,
//   onSocialMediaLinkClick: PropTypes.func.isRequired,
//   openBurgerModal: PropTypes.func.isRequired,
// };

export default MarcelHeader;
