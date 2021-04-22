import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';
// import Avatar from 'atoms/Avatar';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';
import SocialMediaIcons from 'components/molecules/SocialMediaIcons';
import BurgerDrawerModal from 'containers/BurgerDrawerModal';
import ScrollHeaderMobile from 'molecules/ScrollHeaderMobile';
import { SOCIAL_LINKS } from 'constants/users';

import {
  HeaderWrapper,
  MainAndButtonsWrapper,
  MainWrapper,
  NameAndBioWrapper,
  UserName,
  // ContactButtonWrapper,
  // ContactButton,
  IconWrapper
} from './styled';

const LIMIT_TOP = 10;
let oldOffset = 0;

const PublicGalleryHeaderMobile = ({
  firstName, 
  lastName, 
  primaryImage, 
  bio, 
  // onContactButtonClick,
  onSocialMediaLinkClick, 
  socialLinks, 
  match, 
  openBurgerModal,
}) => {
  const [hideScrollView, setScrollView] = useState(true);
  const [isScrollUp, setScroll] = useState(false);

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    const isScrollUp = oldOffset < offsetTop;
    oldOffset = offsetTop;

    if (offsetTop >= LIMIT_TOP) {
      setScrollView(false);
      setScroll(isScrollUp)
    } else {
      setScrollView(true);
      setScroll(isScrollUp)
    }
  }

  return (
    <Fragment>
      <HeaderWrapper hideView={!hideScrollView}>
        <MainAndButtonsWrapper>
          <IconWrapper>
            <Icon size={1.5} clickable onClick={openBurgerModal}>menu</Icon>
          </IconWrapper>
          <MainWrapper>
            <NameAndBioWrapper>
              <UserName>
                {`${firstName || ''} ${lastName || ''}`}
              </UserName>
              {/* <Typography style={{ marginTop: '0.25rem' }} type="small" color="#5C5C5C">{bio}</Typography> */}
            </NameAndBioWrapper>
          </MainWrapper>
        </MainAndButtonsWrapper>
      </HeaderWrapper>

      <ScrollHeaderMobile
        openBurgerModal={openBurgerModal}
        name={`${firstName || ''} ${lastName || ''}`}
        primaryImage={primaryImage}
        isScrollUp={isScrollUp}
        hideScrollView={hideScrollView}
      />
      <EventListener
        target={document}
        onScroll={withOptions(handleScroll, { passive: true, capture: false })}
      />
      <BurgerDrawerModal match={match} />
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

export default PublicGalleryHeaderMobile;
