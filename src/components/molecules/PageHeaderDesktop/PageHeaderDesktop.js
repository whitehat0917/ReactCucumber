import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'atoms/Link';
import Logo from 'molecules/Logo';
import AccountInfo from 'molecules/AccountInfo';
import AppStoreLink from 'molecules/AppStoreLink';
import ImpersonateModal from 'containers/ImpersonateModal';
import { isLinkActive } from 'utils/common';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
`;

const AccountActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  height: 4.5rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-weight: normal;

  ${({ isActive, theme }) => (isActive ? `
    border-bottom: 0.125rem solid ${theme.palette.primary[30]}};
    font-weight: 600;
  ` : '')}
`;

const NavigationWrapper = styled.div`
  display: flex;
  margin-left: 5.75rem;
  flex: auto;
`;

const PageHeaderDesktop = ({
  isLoggedIn, userInfo, userInfoStatus, onLogoutClick, openUploadModal, buttonTitle, isPublicGallery, history,
  onImpersonateClick, impersonatedInfo, onImpersonatedLogoutClick, impersonateStatus, publicUserInfo, router, ...props
}) => {
  return (
    <Wrapper history={history} {...props}>
      <ImpersonateModal impersonateStatus={impersonateStatus} />
      <Logo />
      {
        isPublicGallery && (
          <NavigationWrapper>
            <NavLink
              size="normal"
              color="default"
              to={`/${publicUserInfo.marcel_username}` || '/'}
              fontFamily="secondary"
              isActive={isLinkActive(`/${publicUserInfo.marcel_username}`, router.location.pathname)}
            >
              Artworks
            </NavLink>
            <NavLink
              size="normal"
              color="default"
              to={`/${publicUserInfo.marcel_username}/collections` || '/'}
              fontFamily="secondary"
              style={{ marginLeft: '2rem' }}
              isActive={isLinkActive(`/${publicUserInfo.marcel_username}/collections`, router.location.pathname)}
            >
              Collections
            </NavLink>
            <NavLink
              size="normal"
              color="default"
              to={`/${publicUserInfo.marcel_username}/about` || '/'}
              fontFamily="secondary"
              style={{ marginLeft: '2rem' }}
              isActive={isLinkActive(`/${publicUserInfo.marcel_username}/about`, router.location.pathname)}
            >
              About
            </NavLink>
          </NavigationWrapper>
        )
      }
      {
        !isLoggedIn && <AppStoreLink />
      }
      {
        isLoggedIn && !userInfoStatus.isLoading && userInfo
        && (
          <AccountActionsWrapper>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
            <Link size="normal" type="pseudo" onClick={openUploadModal} id="uploadDialogBtn">{buttonTitle}</Link>
            {impersonatedInfo.id
            && (
            <AccountInfo
              src={impersonatedInfo.thumbnails ? impersonatedInfo.thumbnails.tiny : null}
              name={`${impersonatedInfo.first_name} ${impersonatedInfo.last_name}`}
              onLogoutClick={onImpersonatedLogoutClick}
            />
            )
            }
            <AccountInfo
              src={userInfo.thumbnails ? userInfo.thumbnails.tiny : null}
              name={`${userInfo.first_name} ${userInfo.last_name}`}
              onLogoutClick={onLogoutClick}
              onImpersonateClick={userInfo.isStaff ? onImpersonateClick : null}
            />
          </AccountActionsWrapper>
        )
      }
    </Wrapper>
  );
}

PageHeaderDesktop.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  impersonatedInfo: PropTypes.object.isRequired,
  impersonateStatus: PropTypes.object.isRequired,
  userInfoStatus: PropTypes.object,
  openUploadModal: PropTypes.func.isRequired,
  onImpersonateClick: PropTypes.func.isRequired,
  onImpersonatedLogoutClick: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  router: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default PageHeaderDesktop;
